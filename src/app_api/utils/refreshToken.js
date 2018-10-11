var mongoose = require("mongoose");
var User = mongoose.model("User");

function refresh(token, userID){
    User.findOne(userID, (error, user)=>{
        if(error) {
            return;
        }
    })
}