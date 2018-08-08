var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");

var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
}

function authenticate(req, res) {
    sendJsonResponse(res, 200, {
        "token": "some-fake-token" + req.body.username + req.body.password
    });
}

function register(req, res) {
    // Use crypto for JWT, use bcrypt for password stuff. Bcrypt is more secure.
    let createdHash;
    let newUser;

    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        sendJsonResponse(res, 404, {
            response: "Need to send all parameters, username, email, and password"
        })
    }
    // TODO: Refactor this bad boy at some point
<<<<<<< HEAD
    // User.findOne(req.body.username, (err, res) => {
        // Maybe we could use async await here??? Find out.
        // if(err) {
        //     return;
        // } else if (!res) { 
            bcrypt.genSalt(11, function(err, salt){
                if (err) return;
                bcrypt.hash(req.body.password, salt, function(err, hash){
                    let hashCreated = false;
                    console.log("Created hash is... \n" + hash);
                    if (hash) hashCreated = true;
                    createdHash = hash; 
                    sendJsonResponse(res, 200, {
                        response: {
                            registered: hashCreated
                        }
                    });
                    // newUser = new User({
                    //     name: req.body.username,
                    //     passwordHash: hash,
                    // });
                    // // newUser.save((err) => {
                    //     if (err) {
                    //         sendJsonResponse(res, 200, {
                    //             response: "There was an error creating the user"
                    //         });
                    //     };
                    //     sendJsonResponse(res, 200, {
                    //         response: "User created successfully"
                    //     });
                    // });
                    // // Can get rid of the below. Not going to send the hash
                    // back to the user, that's wierd.
                    // sendJsonResponse(res, 200,{
                    //     "hash": createdHash
                    // });
                });
            });
        // } else {
        //     sendJsonResponse(res, 200, {
        //         response: 'Username taken'
        //     })
        //}
    // });
=======
    User.findOne({ username: req.body.username }, (err, data) => {
        if (err) {
            sendJsonResponse(res, 404, {
                response: "There was an error creating the user"
            });
        } else if (!data) {
            bcrypt.genSalt(11, function (err, salt) {
                if (err) return;
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) return;
                    createdHash = hash;
                    newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        hash: createdHash,
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
>>>>>>> Add a standin for the register endpoint


}
module.exports = {
    authenticate: authenticate,
    register: register
}