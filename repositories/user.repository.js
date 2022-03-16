
const usermodel =require('../models/user.model')
const add =(data)=>{
    const user  =new usermodel(data)
    return user.save()
}
const updateuser =(email,data)=>{
    const {firstname,lastname,password,active,gender,skills,degree} =data  
    return  usermodel.updateOne({email},{
        $set:{
            firstname,
            lastname,
            email,
            password,
            active,
            gender,
            skills,
            degree,
            updatedat:Date.now()
        }
    })
}
const Getusers =(pageindex,pagesize,options)=>{
    const {name,degree, qualification,skills}=options
    const projection ={__v:0,_id:0,password:0}
    const filter ={
           
        $or:[
            {firstName:{$regex:name,$options:'i'}},
            {lastName:{$regex:name,$options:'i'}}
            ]
        }
        if(degree) filter.degree =degree
        if(skills) {
            const skillsarr = skills.split(',')
            filter.skills={$all:skillsarr}
        }
    if(qualification) filter.qualification =qualification
    const skiprows =(pageindex-1)*pagesize
    return usermodel.find(filter,projection)
        .sort({createdat:-1})
        .skip(skiprows)
        .limit(pagesize)
}
const getuserbyemail =(email)=>{
    const projection ={__v:0,_id:0,password:0}
    const filter ={email}
    return usermodel.findOne(filter,projection)
}
const getuserscount =(options)=>{
    const {name,degree,qualification,skills}=options
    const filter ={$or:
        [{firstName:{$regex:name,$options:'i'}},
        {lastName:{$regex:name,$options:'i'}}]}
    if(degree)filter.degree =degree  
    if(qualification) filter.qualification =qualification 
    if(skills) {
        const skillsarr = skills.split(',')
        filter.skills={$all:skillsarr}
    }
    return usermodel.count(filter)
}
const getpassword =(email)=>{
    return usermodel.findOne({email},{password:1,email:1})
}

module.exports={add,updateuser,Getusers,getuserbyemail,getuserscount,getpassword}