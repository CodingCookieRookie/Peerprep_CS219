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


//Only works for unique username due to findOne
//Currently only updates one of the pair
exports.update = function (req, res) {
    // req should be current user's match details -> update current user's match to another suitable user with similar xp
    Match.findOne({username: req.body.username}, function (err, match) {
        if (!match || err) {
            console.log("cannot find");
            console.log(req.body.username);
            res.json({
                status: "failed",
                message: 'Cannot find current user',
                data: match
            });
        } else {
            const currentUserName = match.username;
            const currentUserXP = match.xp;
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
                        console.log("potential name: " + matches[index].username);
                        if (matches[index].username != currentUserName && Math.abs(matches[index].xp - currentUserXP) < diff 
                        && matches[index].wantsMatch) {
                        matches[index].match = currentUserName;
                        matches[index].save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    message: "Save error on potential user: " + err.message,
                                });
                            }
                        });
                        // If found a potential match, update user's match
                            Match.findOne({username: currentUserName}, function (err, match) {
                                if (!match || err) {
                                    res.json({
                                        status: "failed",
                                        message: 'Cannot find current user',
                                        data: match
                                    });
                                } else {
                                    match.match = matches[index].username;
                                    match.save(function (err) {
                                        if (err) {
                                            res.status(400).json({
                                                message: "Save error: " + err.message,
                                            });
                                        } else {
                                            res.json({
                                                status: "Success",
                                                message: 'Found a match and saved first successfully',
                                                data: match
                                            });
                                        }
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
                            data: matches
                        });
                    }
                }
               
            });
        }
    });
    
};

// Handle delete match of user
// Note does not delete any match. But delete a match's match
exports.delete = function (req, res) {
    Match.findOne({username: req.username}, function (err, match) {   // If have same xp
        if (!match || err) {
            res.json({
                status: "failed",
                message: 'All users have match or there were no close match',
                data: match
            });
        } else {
            match.match = "";
            res.json({
                message: 'Delete of match partner successful',
                data: match
            });
        }
       
    });
};

// exports.delete = function (req, res) {
//     Match.findOneAndRemove({username: req.params.username}, function (err, match) {
//         if (err) {
//             res.json({
//                 status: "failed",
//                 message: 'Contact details not deleted!',
//                 data: contact
//             });
//         } else {
//             if (contact) {
//                 res.json({
//                     status: "success",
//                     message: 'Contact deleted!',
//                     data: contact
//                 });
//             } else {
//                 res.json({
//                     status: "failed",
//                     message: 'Contact details can not be found!',
//                     data: contact
//                 });
//             }
//         }
//     });
// };