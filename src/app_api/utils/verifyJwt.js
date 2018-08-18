function invalidJwtSignature(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        return (res.status(401).send('Invalid authorization token'));
    }
}

module.exports = {
    invalidJwtSignature: invalidJwtSignature
}