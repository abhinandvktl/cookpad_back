const jwt =require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("Inside jwtMiddleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    try{
        const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
        req.payload = jwtResponse.userId
        console.log(req.payload);
        next()
    }catch(err){
        res.status(401).json("Authorization failed!! Please Login..")
    }
}

module.exports = jwtMiddleware