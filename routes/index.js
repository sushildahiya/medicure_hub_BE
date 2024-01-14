const express=require('express')
const router = express.Router()


router.get('/',(req,res)=>{

})

router.use('/user',require('./user/index'))

module.exports = router