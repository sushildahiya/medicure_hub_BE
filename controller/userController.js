const {hashPassword, verifyPassword } = require("../config/bcryptConfig")
const User = require('../models/user')
const db= require('../config/mongooseConfig')
const jwt = require('jsonwebtoken');

module.exports.registerUser =async (req,res)=>{
    try{
        const hashedPassword = await hashPassword(req.body.password);
        const newUser = await User.create({
            name: req.body.name,
            mobile_no: req.body.mobile_no,
            email: req.body.email,
            password: hashedPassword
          });
          return res.status(200).send({
            "reference_id": newUser.id,
            "msg": "User has been created",
          }).end();
    }catch(err){
        console.error('Error in registering user:', err);

        res.status(500).send({
            "msg": "Internal Server Error",
          });    }
  }

  module.exports.emailUniquness = async(req,res)=>{
    const user = await User.findOne({ email: req.body.email });
    if( user ){
        res.status(200).send({
            "uniqueness": "false",
          });
    }else{
        res.status(200).send({
            "uniqueness": "true",
          });
    }
  }

  module.exports.createSession = async(req,res)=>{
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || !await verifyPassword(req.body.password,user.password)) {

          return res.json(422, {
            message: "Invalid email address or password"
          });
        }
        return res.json(200, {
          message: 'Sign in successful, here is your token, please keep it safe!',
          data: {
            token: jwt.sign(user.toJSON(), 'healthAPI', {
              expiresIn: '604800'
            }),
            user_id:user.id
          }
        });
    
      } catch (err) {
        return res.json(500, {
          message: "Internal Server Error"
        });
      }
  }

module.exports.getUser=async (req,res)=>{
  try{
    let user = await User.findOne({ id: req.body.user_id });
    if (user) {
      return res.json(200, {
        ...user
      });
    }else{
      return res.json(400,{
        "messagge": "Something went wrong"
      })
    }
  }catch(err){

  }
}
module.exports.setHealthData=async (req,res)=>{
  try{
    let user = await User.findOne({ id: req.body.user_id });
    user.health_data_detail={
      blood_group:req.body.blood_group,
      age:req.body.age,
      height:req.body.height,
      weight:req.body.weight,
      address:req.body.address
    }
    user.health_data=true
    user.save()
    res.json(200,{message:"success"})
  }catch(err){

  }
}