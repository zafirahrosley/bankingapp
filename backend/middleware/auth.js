const jwt = require("jsonwebtoken")

module.exports = {
    auth: function auth(req,res,next){
        try{
            const token = req.headers.authorization.split(" ")[1];
            if(!token) res.status(401).json({ message: "No token, authorization denied!"})
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = decoded;
            next();
        }
        catch(err){
            return res.status(401).json({
                message: "Authentication failed"
            })
        }
    },
    authReset: function authReset(req,res,next){
        try{
            const token = req.params.token;
            if(!token) res.status(401).json({ message: "No token, authorization denied!"})
            const decoded = jwt.verify(token, process.env.JWT_RESET)
            req.user = decoded;
            next();
        }
        catch(err){
            return res.status(401).json({
                message: "Authentication failed"
            })
        }
    }
}
