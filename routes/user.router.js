const express =require('express')
const router =express.Router()
const userctrl =require('../controller/user.ctrl')

router.post('/signup',userctrl.register)
router.get('/page/:page/size/:size',userctrl.getusers)
router.get('/',userctrl.getusers)
router.put('/:email',userctrl.updateuser)
router.get('/:email',userctrl.getuserbyemail)


module.exports =router