const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const MATCH_API_URL = process.env.PROD_MATCH_API_URL || (process.env.DEV_MATCH_API_URL || 'http://localhost:5003/api')

function validateEmail(email) {
    // regex to check if email ends with ".edu"
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(edu)))$/;
    return re.test(String(email).toLowerCase());
}

// GET (all users)
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        return res.json({
            message: "Users retrieved successfully!",
            data: users,
        });
    });
};

// GET (get 1 user using username)
exports.view = function (req, res) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        if (user == null) {
            // user does not exist
            return res.status(404).json({ message: "Cannot find user!" });
        }
        return res.json({
            message: "User " + req.params.username + " retrieved successfully!",
            data: user,
        });
    });
};

// POST (Create new user)
exports.new = async function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (user != null) {
            // Already exist user with that username
            return res.status(405).json({
                message:
                    "There already exist a user with the username of " +
                    req.body.username +
                    "!",
            });
        }
        if (req.body.email != null) {
            // check if email ends with .edu
            if (!validateEmail(req.body.email)) {
                return res.status(405).json({
                    message: 'Please use an email that starts with ".edu"',
                });
            }
        }
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        // insert a match into match database
        const response = await fetch(MATCH_API_URL + '/matches', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.t
            body: JSON.stringify({
                username: newUser.username
            })
        });

        if (res.json.status == 'success') { // match inserted
            newUser.save(function (err) {
                if (err) {
                    return res.status(400).json({
                        message: err.message,
                    });
                }
                return res.status(201).json({
                    message: "New user created!",
                    data: newUser,
                });
            });
        } else {
            return res.status(400).json({
                message: res.json.message,
                status: "failed"
            });
        }
        
        
};

// PUT (Edit a user's details)
exports.update = async function (req, res) {
    let isExist = null;
    if (req.body.username != null) {
        try {
            await User.findOne(
                { username: req.body.username },
                function (err, user) {
                    if (user != null) {
                        isExist = true;
                    } else {
                        isExist = false;
                    }
                }
            ).then();
        } catch (e) {}
    }
    User.findOne({ username: req.params.username }, function (err, user) {
        if (user == null) {
            // user does not exist
            return res.status(404).json({ message: "Cannot find user!" });
        }
        if (req.body.username != null) {
            user.username = req.body.username;
        }
        if (req.body.email != null) {
            // check if email ends with .edu
            if (!validateEmail(req.body.email)) {
                return res.status(405).json({
                    message: 'Please use an email that starts with ".edu"',
                });
            }
            user.email = req.body.email;
        }
        if (req.body.password != null) {
            user.password = req.body.password;
        }
        if (isExist) {
            // Already exist user with that username
            return res.status(405).json({
                message:
                    "There already exist a user with the username of " +
                    req.body.username +
                    "!",
            });
        }
        user.save(function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            return res.json({
                message:
                    "User " + req.params.username + " information updated!",
                data: user,
            });
        });
    });
};

// DELETE
exports.delete = function (req, res) {
    User.findOneAndDelete(
        { username: req.params.username },
        function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            }
            if (user == null) {
                // user does not exist
                return res.status(404).json({ message: "Cannot find user!" });
            }
            return res.json({
                message: "User " + req.params.username + " deleted!",
            });
        }
    );
};
/* To be deleted if authController is ok.
// LOGIN
exports.login = async function (req, res) {

    try {
        // Get user input
        const { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          res.status(400).send({ 
            message: "Fill in all fields." 
          });
        }
        // Check if user exist in our database
        const user = await User.findOne({ username: username });
  
        // Authorisation success
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
              { user_id: user._id },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "3d" }
          );
          // remove user password
          let data = user.toObject()
          delete data.password
    
          // user
          return res.status(200).json({ token: token, user: data });
        }
        return res.status(400).send({ message: "Invalid credentials." });
      } catch (err) {
        console.log(err);
        return res.status(500)
      }

    // User.findOne(
    //     { username: req.params.username, password: req.body.password },
    //     function (err, user) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: err.message,
    //             });
    //         }
    //         if (!user) {
    //             return res.status(404).json({
    //                 message: "Invalid user credentials",
    //             });
    //         } else {
    //             return res.status(200).json({
    //                 message:
    //                     "User " +
    //                     req.params.username +
    //                     " successfully logged in",
    //                 data: user,
    //             });
    //         }
    //     }
    // );
};
*/