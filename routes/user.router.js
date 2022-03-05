const express =require('express')
const router =express.Router()
const userctrl =require('../controller/user.ctrl')
const tokenauth =require('../middlewares/tokenauth')

router.post('/signup',userctrl.register)
router.post('/signin',userctrl.signin)
router.get('/page/:page/size/:size',userctrl.getusers)
router.get('/',tokenauth,userctrl.getusers)
router.put('/:email',userctrl.updateuser)
router.get('/:email',userctrl.getuserbyemail)


module.exports =router