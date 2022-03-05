const userrepository =require('../repositories/user.repository');


const register =async(req,res)=>{
    try{
        const data =req.body
        await userrepository.add(data)
        res.status(201)
        res.send()

    }catch(e){
        if(e._message ==="product validation failed"){
            res.status(401);
            res.send(e.errors)
        }else if(e.message.indexOf('duplicate key error collection')>-1){
            res.status(404)
            res.send('user already exist')
        }else{
            console.log(e)
            res.status(500)
            res.send('internal server error')
        }
    }
}
const updateuser =async(req,res)=>{
    try{
        const email =req.params.email;
        await userrepository.updateuser(email,req.body)
        res.status(201)
        res.send()
    }catch(e){
        console.log(e)
        res.status(400)
        res.json("internal server error")
    }
}

const getusers= async(req,res)=>{
    try{
        const pageindex = +req.params.page || 1
        const pagesize= +req.params.size || 10
        const options= {
            name:req.query.name || "",
            degree :+req.query.degree ,
            qualification:+req.query.qualification,
            skills :req.query.skills  
        }
        const totalrecords = await userrepository.getuserscount(options)
        const totalpages =Math.ceil(totalrecords/pagesize)
        const user= await userrepository.Getusers(pageindex,pagesize,options)
        const response ={
            data:user,
            metadata:{
                totalrecords:totalrecords,
                totalpages:totalpages
            }
        }

        res.status(201)
        res.json(response)
        

    }catch(e){
        res.status(500).json('internal server error')
    }
}

const getuserbyemail =async(req,res)=>{
   userrepository.getuserbyemail(req.params.email)
    .then(user=>res.status(203).json(user))
    .catch(err=>res.status(400).send('intenal server error'))
}
module.exports={register,updateuser,getusers,getuserbyemail}