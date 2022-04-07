const jwt =require('jsonwebtoken')

const tokenauth=(req,res,next)=>{
    const authheader =req.headers.authorization 
    const token = authheader.split(' ')
    const jwttoken =token[1]
    jwt.verify(jwttoken,"secret")
    next()

}

module.exports =tokenauth