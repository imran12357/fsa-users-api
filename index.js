const express =require('express')
const mongoose =require('mongoose')
const bodyparser = require('body-parser')
const config =require('./configs/index')
const app =express();
const defaultrouter=require('./routes/default.route')
const userrouter =require('./routes/user.router')

const port =3000;

app.listen(port,()=>{
    console.log(`server is running on port ${3000}`)
})
app.use(bodyparser.json())




mongoose.connect(config.dbconstr)
    .then(res=>{console.log('connected to mongodb')})
    .catch(err=>{console.log('failed to connect database')})
app.use('/',defaultrouter)
app.use('/api/users',userrouter)