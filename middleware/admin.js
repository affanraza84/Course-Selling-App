const jwt = require('jsonwebtoken');

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);

    if(decodedInformation){
        req.userId = decodedInformation.id;
        next();
    }
    else{
        res.status(403).json({
            message : "you are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware : adminMiddleware
}