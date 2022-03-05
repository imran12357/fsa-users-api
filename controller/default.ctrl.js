const mongoose = require("mongoose");
const config =require('../configs/index')

const get  =(req,res)=>{
    res.status(200);
    res.json("Product Api")
}


const health =(req,res)=>{
    mongoose.connect(config.dbconstr)
        .then(()=>{
            res.status(201);
            res.send('db : up')
        })
        .catch(()=>{
            res.status(500);
            res.send('internal server error')
        })
}
module.exports ={get,health}