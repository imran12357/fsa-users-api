const express =require('express');
const router =express.Router()


const defaultctrl =require('../controller/default.ctrl')

router.get('/',defaultctrl.get)
router.get('/health',defaultctrl.health)
module.exports=router