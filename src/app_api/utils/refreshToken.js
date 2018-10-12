const jwt = require("jsonwebtoken");

function refreshToken(req, userID) {
    let token;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        token = req.headers.authorization.split(' ')[1];
    else 
        return null;

    let verifiedToken;
    try {
        verifiedToken = jwt.verify(token, 'secret');
    } catch (e) {
        return null;
    }
    let {_id: id, email, name } = verifiedToken;
    let exp = new Date();
    exp.setTime(exp.getTime() + 15*60000);

    let newToken = jwt.sign({
        _id: id,
        email: email,
        name: name,
        exp: parseInt(exp / 1000)
    },
    'secret');
    return newToken;
}

module.exports = {
    refreshToken
}