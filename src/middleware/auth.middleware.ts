import jwt from "jsonwebtoken";
import * as process from "process";
function authMiddleware(req, res, next) {
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(401).json({message: req.headers})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded;
        console.log(decoded)
        return next();
    } catch (e) {
        return res.status(401).json({message: "Auth message"})
    }
}

export default authMiddleware;