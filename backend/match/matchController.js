const e = require('express');

Match = require('./matchModel');

const diff = 100;
// Find individual match only
exports.getCurrentUserMatch = function (req, res) {
    Match.findOne({username: req.params.username}, function (err, currentUser) {
        if (err) {
            res.status(400).json({
                message: "Error finding user. Error: " + err.message,
            });
        } else if (currentUser == null) {
            res.status(400).json({
                message: "Can't find current user with username: " + req.body.username,
            });
        }
        else {
            res.json({  // any res.json call should end the call
                status: "Success",
                message: 'Found current user status successfully',
                data: "Current user: " + currentUser
            });
        }
    });
}

// Can use this function to update xp/Online/WantsMatch/Match fields. 
// If matching with friend, use this and set match to friend, if match field is not empty, it will try to find friend and update friend's match to current user as well
// If successfully match with friend, will set wantsMatch to false as a 2nd layer precaution on top of match being not null to prevent other users from matching
exports.updateCurrentUserMatch = function (req, res) {
    Match.findOne({username: req.body.username}, function (err, currentUser) {
        if (err) {
            res.status(400).json({
                message: "Error finding user. Error: " + err.message,
            });
        } else if (currentUser == null) {
            res.status(400).json({
                message: "Can't find current user with username: " + req.body.username,
            });
        }
        else {
            if (req.body.isOnline== null) {
                res.status(400).json({
                    message: "Please input the isOnline status of user."
                });
            } else if (req.body.wantsMatch == null) {
                res.status(400).json({
                    message: "Please input the wantsMatch status of user."
                });
            } else {
            currentUser.xp = req.body.xp;
            currentUser.isOnline = req.body.isOnline;
            currentUser.wantsMatch = req.body.wantsMatch;
            if (req.body.match != null) {
                // If there is a friend field added, update friend's match first
                currentUser.wantsMatch = false;
                currentUser.match = req.body.match;
                Match.findOne({username: req.body.match}, function (err, friend) {
                    if (err) {
                        res.status(400).json({
                            message: "Error finding friend: " + err.message,
                        });
                    } else {
                        if (friend == null) {
                            res.status(400).json({
                                message: "Friend username is invalid."
                            });
                        } else if (!friend.isOnline) {
                            res.status(400).json({
                                message: "Friend is not online!"
                            });
                        } else if (friend.match != null) {
                            res.status(400).json({
                                message: "Friend is in another interview!"
                            });
                        } else {
                            friend.wantsMatch = false;
                            friend.match = currentUser.username;
                            friend.save( function (err) {
                                // Check for save error
                                if (err) {
                                    res.json({
                                        message: 'Failed to save friend match as current user.',
                                        data: err
                                    });
                                } else {
                                    currentUser.save(function (err) {
                                        if (err) {
                                            res.status(400).json({
                                                message: "Error saving current user status: " + err.message,
                                            });
                                        } else {
                                            res.json({  // any res.json call should end the call
                                                status: "Success",
                                                message: 'Save current user status with friend successfully',
                                                data: currentUser
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            } else {
                currentUser.save(function (err) {
                    if (err) {
                        res.status(400).json({
                            message: "Error saving current user status: " + err.message,
                        });
                    } else {
                        res.json({  // any res.json call should end the call
                            status: "Success",
                            message: 'Save current user status successfully',
                            data: currentUser
                        });
                    }
                });
            }
            } 
        }
    });
}

exports.matches = function (req, res) {
    //Find all matches
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

/* Info on new: For each user, a match will be created with user's username, start xp = 0, with match = null, wantsMatch = false */
/* Info on update: Update is called when click on match button -> wantsMatch status will be true -> If got match, match partner in both user's and match's match field will be updated */
/* Info on delete: Match field on *CURRENT USER ONLY* will be null and wantsMatch status set to false */

exports.new = function (req, res) {
    var match = new Match();
    match.username = req.body.username;
    match.xp = 0;
    match.match = null;
    match.wantsMatch = false;
    match.isOnline = true;
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
                    status: "failed",
                    message: 'One of the required fields not satisfied',
                    data: err
                });
            }
            else
                res.json({
                    status: "success",
                    message: 'New match created!',
                    data: match
                });
        });
    }
};

// Before match -> Should call to delete match first -> Call match update to find match
// Because match updates always try to find someone without a match
// Only works for unique username due to findOne
// *NOTE THIS FUNCTION SHOULD BE USED ONLY FOR MATCH BUTTON*, individual user update should use updateCurrentUserMatch
exports.update = function (req, res, socket) {
    // req should be current user's match details -> update current user's match to another suitable user with similar xp
    Match.findOne({username: req.body.username}, function (err, currentMatch) {
        if (!currentMatch || err) {
            res.json({
                status: "failed",
                message: 'Cannot find current user',
                data: currentMatch
            });
        } else {
            const currentUserName = currentMatch.username;
            const currentUserXP = currentMatch.xp;
            currentMatch.isOnline = true;
            currentMatch.wantsMatch = true;
            // if (!currentUserWantsMatch || !currentUserOnline) {
            //     // If not online or does not want match, this function just updates and saves their isOnline and wantsMatch status to false
            //     currentMatch.save(function (err) {
            //         if (err) {
            //             res.status(400).json({
            //                 message: "Save error on current user online and match status: " + err.message,
            //             });
            //         } else {
            //             res.json({  // any res.json call should end the call
            //                 status: "Success",
            //                 message: 'Set current user status successfully',
            //                 data: "Current user: " + currentUserName
            //             });
            //         }
            //     });
            //     return;
            // }
            Match.find({match: null}, function (err, matches) {   // If have same xp
                if (!matches || err) {
                    res.json({
                        status: "failed",
                        message: 'All users have match',
                        data: matches
                    });
                } else {
                    var potentialExist = false;
                    for (index in matches) {
                        if (matches[index].username != currentUserName && Math.abs(matches[index].xp - currentUserXP) < diff 
                        && matches[index].wantsMatch && matches[index].isOnline) {
                        potentialExist = true;
                        console.log("potential name: " + matches[index].username);
                        matches[index].match = currentUserName;
                        matches[index].save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    message: "Save error on potential user: " + err.message,
                                });
                            } else {
                                currentMatch.match = matches[index].username;
                                currentMatch.save(function (err) {
                                    if (err) {
                                        res.status(400).json({
                                            message: "Save error on current user: " + err.message,
                                        });
                                    } else {
                                        socket.emit(`match-found-${currentUserName}`, {match: matches[index].username});
                                        socket.emit(`match-found-${matches[index].username}`, {match: currentUserName});
                                        res.json({  // any res.json call should end the call
                                            status: "Success",
                                            message: 'Found both matches and saved both successfully',
                                            data: "Current user: " + currentUserName + " Matched user: " + matches[index].username
                                        });
                                    }
                                });
                            }
                        });
                        return;
                        } 
                    }
                    if(!potentialExist) {
                        // Required to save your wantsMatch and isOnline status (if no match) which will be true now.
                        currentMatch.save(function (err) {
                            if (err) {
                                res.status(400).json({
                                    message: "Save error on current user wantMatch status: " + err.message,
                                });
                            } else {
                                res.json({  // any res.json call should end the call
                                    status: "Success",
                                    message: 'Set current user wantMatch status to true successfully',
                                    data: "Current user: " + currentUserName
                                });
                            }
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
    Match.findOne({username: req.body.username}, function (err, match) { 
        if (!match || err) {
            res.json({
                status: "failed",
                message: 'Cannot find user',
                data: match
            });
        } else {
            match.wantsMatch = false;   //prevent auto matching when exit interview
            match.match = null;
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