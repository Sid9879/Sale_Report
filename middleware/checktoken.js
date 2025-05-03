const jwt = require ('jsonwebtoken');
const JWT_SCECRET = process.env.JWT_SCECRET


const checkToken = async(req,res,next)=>{
    try {
        const token = req.cookies.token;;
    if(!token){
        return res.status(401).json({msg:"Your session has expired. Please login again.",success:false});
    }
    const decode = jwt.verify(token,process.env.JWT_SCECRET);
    req.user = decode;
    next()

} catch (error) {
    res.status(500).json({msg:'Internal sever error',error:error.message,success:false});
}
}
 
module.exports = checkToken;