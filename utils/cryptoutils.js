const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')


const gethash =(pwd)=>{
   return bcrypt.hash(pwd,1)
}


const compare =(pwd,hashpwd)=>{
    return bcrypt.compare(pwd,hashpwd)
}

const gettoken =(user)=>{
    return jwt.sign({email:user.email},'secret',{expiresIn: '10m'})
}
module.exports = {gethash,compare,gettoken}