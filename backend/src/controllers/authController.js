import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken'; 
import crypto from 'crypto' ;
import imagekit from '../utils/ImagekitIO.js';
import { sendMail, forgotPasswordMailGenContent }  from '../utils/mail.js'  ;
import { signinToken, createSendToken, defaultAvatarUrl, filterObj } from '../utils/token.js' ;
// signup :  to create the account 

const signup = async(req ,res)=>{
try{
const newUser = await User.create({
  name:req.body.name ,
  email: req.body.email ,
  phoneNumber:req.body.phoneNumber ,
  password : req.body.password ,
  passwordConfirm:req.body.passwordConfirm ,
  avatar:{ url:req.body.avatar || defaultAvatarUrl(req.body.name)}
})
createSendToken(newUser,201 ,res) ;
}
catch(error){
  res.status(400).json({message:error.message})
}
}
// login : check email+ password , then give token
const login = async(req,res)=>{
try{
const {email , password} = req.body ;
if(!email || !password){
  throw new Error("Please provide email or password")
}

const user = await User.findOne({email}).select("+password")
if(!user|| (await user.correctPassword(password , user.password))==false){
  throw new Error("Incorrect email or password")
}

createSendToken(user , 200 , res)
}

catch(error){
res.status(401).json({status:"fail",message:error.message})
}
}
export {signup , login}  ;