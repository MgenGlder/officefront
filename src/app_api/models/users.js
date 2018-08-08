var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString("hex"); //using this in a mongoose method refers to the model itself
  //password, salt thing, iterations, key length
  //because mongoose, the hash and salt is automatically added to the model
};


userSchema.methods.validPassword = function (password ){
  // var hash = crypto.pbkdf2Sync(password, this.salt, 100000, 64, 'sha512').toString("hex");
  // TODO: Get rid of these comments and console logs.
  let hash = bcrypt.hashSync(password, this.salt);
  console.log('old hash ' + this.hash );
  console.log('new hash ' + hash);
  return this.hash === hash;
  //will create a new hash from the password given and test it against the hash already in the model/database
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7); // expires in 7 days

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    // ^ payload v
    exp: parseInt(expiry.getTime() / 1000),
  }, 
  // process.env.JWT_SECRET); //secret key
  "secret");
};

mongoose.model("User", userSchema)
// var User = mongoose.model("User");
// var user = new User();
// user.name = "User's Name";
// user.email = "test@example.com";
// user.setPassword("myPassword");
// user.save();
