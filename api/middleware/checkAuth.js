const jwt = require('jsonwebtoken');


function checkAuth(req, res, next)
{
    try
    {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);

        req.userData = decoded;

        next();
    }
    catch(err)
    {
        res.status(401).json({
            message: "Auth failed"
        });
    }
}

module.exports = 
{
    checkAuth
}