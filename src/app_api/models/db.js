var mongoose = require("mongoose");


var readLine = require("readline");
if(process.platform === "win32"){
  var rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ("SIGNINT", function () {
    process.emit ("SIGINT");
  });
}

var dbURI = "mongodb://localhost/Officefront";
//If this is run on the server, use the live database.
//NODE_ENV is production, MONGOLAB_URI is the url to access database
if (process.env.NODE_ENV === "production") {
  dbURI = process.env.MONGOLAB_URI
  console.log("We in the server database")
}
mongoose.connect(dbURI);
console.log("the database connected")
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbURI);
});

mongoose.connection.on("error", function(err) {
  console.log("Mongoose connection error " + err);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

var gracefulShutdown = function (msg, callback){
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});

process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
})

process.on("SIGTERM", function (){
  gracefulShutdown("Heroku app shutdown", function () {
    process.exit(0);
  });
});

require("./locations");
require("./users");
