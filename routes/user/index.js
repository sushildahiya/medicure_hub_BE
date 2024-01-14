const express = require('express')
const router = express.Router()
const userController = require('../../controller/userController')
router.post('/register',userController.registerUser)
router.post('/email_uniquness',userController.emailUniquness)
router.post('/login',userController.createSession)
router.post('/user_details',userController.getUser)
router.post('/health_data',userController.setHealthData)
module.exports = router