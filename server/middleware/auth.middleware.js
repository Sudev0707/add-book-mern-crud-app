
const jwt = require("jsonwebtoken");
const User = require("../model/user.model")


const authMidleware = async (req, res, next) => {
    const authHeader = req.headers.authorizations;

    try {
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(500).json({message:"Invalid token ! ", success: false});
        }

        const token = authHeader.split(" ")[1];
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifiedToken){
            return res.status(500).json({message:"Invalid token ! ", success: false});
        }

        const verifiedUser = await User.findOne({Email: verifiedToken?.email }).select("-Password");

        if(!verifiedUser){
            return res.status(500).json({message:"Not a valid user", success: false})
        }

        // set user if verified
        req.user = verifiedUser;
        next();

        
    } catch (error) {

        if(error.name == "TokenExpiredError"){
            return res.status(401).json({message:"Token Expired", success: false})
        }
        if(error.name == "JsonWebTokenError"){
            return res.status(401).json({message:"Invalid Token Authentication Failed ", success: false})
        }

        return res.status(500).json({message:error.message, success: false})
    }
}

module.exports = authMidleware