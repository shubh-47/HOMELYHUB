// user Schema
import  mongoose from "mongoose" ;
import validator from "validator" ;
import bcrypt from "bcrypt" ;
import crypto from "node:crypto" ;



const userSchema  = new mongoose.Schema({
  name : {
    type : String ,
    required:[true , "Please enter your name"] ,
    trim : true , // removes space between start to end 
  
  } ,
  email: {
    type : String ,
    required : [true , "Please enter email ID"]  ,
    unique : true ,
    lowercase : true ,
    trim : true ,
    validate : [validator.isEmail , "Please enter valid email address"] ,

  } ,
   password:{
    type : String ,
    required : [true , "please enter password"],
    select:false
   },
    passwordConfirm: {
  type: String,
  required: [true, "please confirm your password"],
  validate: {
    validator: function (el) {
      return el === this.password;
    },
    message: "Passwords are not the same!"
  }
},

phoneNumber: {
  type: String,
  required: true,
  unique: true,
  trim: true
},
    role:{
        type:String ,
        enum:["user" , "admin"] ,
        default:"user"

    },
    avatar:{
      url:{ type:String } ,
      public_id :{type : String}
    } ,
    passwordChangedAt:{
      type:Date ,
    },
    passwordResetToken:{
      type:String,
      select:false,
      index:true
    },

     passwordResetExpires:{
      type:Date ,
      select:false,
     },
} ,
{timestamps:true}
)
// settings to not pass in response from server
userSchema.set("toJSON",{
  transform:function(doc , ret){
    delete ret.password;
    delete ret.passwordConfirm;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires; 
    delete ret.__v;
    return ret;
  }
})
//password logic
//hashing

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  if (!this.isNew) {
    this.passwordChangedAt = Date.now() - 1000;
  }
});
// login check
userSchema.methods.correctPassword = async function (candidatePassword , userPassword) {
  return await bcrypt.compare(candidatePassword , userPassword) ;
  
}
userSchema.methods.changedPasswordAfter = function (JWTTimestamp){
  if(this.passwordChangedAt){
  const changedTimeStamp = parseInt(
    this.passwordChangedAt.getTime()/1000 , 10
  ) ;
return JWTTimestamp < changedTimeStamp 
}
return false ;
}
// forgot password
userSchema.methods.createPasswordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString("hex") ;
  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex") ;

  this.passwordResetExpires=Date.now() +10*60*1000 ;
  return resetToken ;


}
const User = mongoose.model("User", userSchema) ;
// in mongoDB : users 
export {User} ;