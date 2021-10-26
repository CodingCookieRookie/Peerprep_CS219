const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

function validateEmail(email) {
    // regex to check if email ends with ".edu"
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+(edu)))$/;
    return re.test(String(email).toLowerCase());
}

// Register (Create new user)
exports.new = async (req, res) => {
    try {
        const { username, email, password } = req.body
        
        // Validate user input
        if (!(username && email && password)) {
            return res.status(400).json({
                message: "Fill in all fields."
            });
        }

        if (email != null) {
            // check if email ends with .edu
            if (!validateEmail(req.body.email)) {
                return res.status(405).json({
                    message: 'Please use an email that starts with ".edu"',
                });
            }
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ username: username });
        
        if (oldUser !== null) {
            return res.status(405).send({ 
                message: "There exists a current account with this username. Please login or change your username." 
            });
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
            username: username, 
            email: email,
            password: encryptedPassword
        });
        
        // hide password
        const data = user.toObject();
        delete data.password;

        // return new user
        return res.status(201).json({
            message: "New user created.",
            data: data
        });
    } catch (err) {
        return res.status(500);
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        // Get user input
        const { username, password } = req.body;
    
        // Validate user input
        if (!(username && password)) {
          return res.status(400).send({ 
            message: "Fill in all fields." 
          });
        }
        // Check if user exist in our database
        const user = await User.findOne({ username: username });
        
        if (!user) {
            return res.status(400).json({ message: "User account not recorded in system." });
        }
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
        } else {
            return res.status(400).send({ message: "Invalid credentials." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500)
    }
};