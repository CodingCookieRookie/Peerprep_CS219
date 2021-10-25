const e = require('express');

Match = require('./matchModel');
const diff = 100;

exports.match = function (req, res) {
    Match.get(function (err, matches) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        } else {
            res.json({
                status: "success",
                message: "Matches retrieved successfully!",
                data: matches
            });
        }
    });
};

exports.new = function (req, res) {
    var match = new Match();
    match.username = req.body.username;
    match.xp = req.body.xp;
    match.match = req.body.match;
    match.wantsMatch = req.body.wantsMatch;
    console.log("user: " + match.username);
    console.log("xp: " + match.xp);
    console.log("wants: " + match.wantsMatch);
    if (match.wantsMatch) {
        console.log ("wants"); 
    } else {
        console.log("dont want");
    }
    if (req.body.username == null) {
        res.json({
            status: "failed",
            message: 'Need to add username',
            data: match
        });
    } else {
        match.save(function (err) {
            // Check for validation error
            if (err)
            {
                res.json({
                    message: 'One of the required fields not satisfied',
                    data: err
                });
            }
            else
                res.json({
                    message: 'New match created!',
                    data: match
                });
        });
    }
};

// Before match -> Should call to delete match first -> Call match update to find match
// Because match updates always try to find someone without a match

//Only works for unique username due to findOne
//Currently only updates one of the pair
exports.update = function (req, res) {
    // req should be current user's match details -> update current user's match to another suitable user with similar xp
    Match.findOne({username: req.body.username}, function (err, currentMatch) {
        if (!currentMatch || err) {
            console.log("cannot find");
            console.log(req.body.username);
            res.json({
                status: "failed",
                message: 'Cannot find current user',
                data: currentMatch
            });
        } else {
            const currentUserName = currentMatch.username;
            const currentUserXP = currentMatch.xp;
            Match.find({match: ""}, function (err, matches) {   // If have same xp
                if (!matches || err) {
                    res.json({
                        status: "failed",
                        message: 'All users have match',
                        data: matches
                    });
                } else {
                    var potentialExist = false;
                    console.log("name: " + currentUserName);
                    for (index in matches) {
                        if (matches[index].username != currentUserName && Math.abs(matches[index].xp - currentUserXP) < diff 
                        && matches[index].wantsMatch) {
                        console.log("potential name: " + matches[index].username);
                        matches[index].match = currentUserName;
                        matches[index].save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    message: "Save error on potential user: " + err.message,
                                });
                            }
                        });
                        currentMatch.match = matches[index].username;
                        currentMatch.save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    message: "Save error on current user: " + err.message,
                                });
                            } else {
                                res.json({  // any res.json call should end the call
                                    status: "Success",
                                    message: 'Found both matches and saved both successfully',
                                    data: "Current user: " + currentUserName + " Matched user: " + matches[index].username
                                });
                            }
                        });
                        return;
                        } 
                    }
                    if(!potentialExist) {
                        res.json({
                            status: "Fail",
                            message: 'Cannot find a match',
                            data: currentUserName
                        });
                    }
                }
               
            });
        }
    });
    
};

// Handle delete match of user
// Note does not delete any match. But delete a match's match
// Should be called before finding match / done with interview
// Existing match acts as a second layer to wantsMatch (If have existing match then will not match)
exports.delete = function (req, res) {
    Match.findOne({username: req.body.username}, function (err, match) {   // If have same xp
        if (!match || err) {
            res.json({
                status: "failed",
                message: 'Cannot find user',
                data: match
            });
        } else {
            match.match = "";
            match.save(function (err) {
                if (err) {
                    res.status(400).json({
                        message: "Save error on deleting match: " + err.message,
                    });
                } else {
                    res.json({  // any res.json call should end the call
                        status: "Success",
                        message: 'Deleted user match',
                        data: match
                    });
                }
            });
        }
       
    });
};