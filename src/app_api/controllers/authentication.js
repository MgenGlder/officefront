const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}
// TODO: Handle the unhappy path of if the password is incorrect. Also pass the token in a real way. Not this fake way.
function authenticate(req, res) {
    if (req.body.username && req.body.password) {
        User.findOne({username: req.body.username}, function (err, data) {
            if (data && data.validPassword(req.body.password)) {
                let token = data.generateJwt();
                sendJsonResponse(res, 200, {
                    "token": token
                });
            }
        });
    }
}

function register(req, res) {
    // Use crypto for JWT, use bcrypt for password stuff. Bcrypt is more secure.
    let createdHash;
    let newUser;
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined || req.body.firstName == undefined || req.body.lastName == undefined) {
        sendJsonResponse(res, 404, {
            response: "Need to send all parameters, username, email, and password"
        })
        return null;
    }
    // TODO: Refactor this bad boy at some point
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) {
            sendJsonResponse(res, 404, {
                response: "There was an error creating the user"
            });
        } else if (!data) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return;
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) return;
                    createdHash = hash;
                    newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        hash: createdHash,
                        salt: salt
                    });
                    newUser.save((err) => {
                        if (err) {
                            sendJsonResponse(res, 404, {
                                response: "There was an error creating the user",
                                err: err
                            });
                        } else {
                            sendJsonResponse(res, 200, {
                                response: "User created successfully"
                            });
                        }
                    });
                });
            });
        } else {
            sendJsonResponse(res, 200, {
                response: 'Username taken'
            });
        }
    });


}
module.exports = {
    authenticate: authenticate,
    register: register
}