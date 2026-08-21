//which property
// which user
//price
//dates
//guests
//paid
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{ 
   property:{
    type:mongoose.Schema.ObjectId,
    red:"Property",
    required:[true,"Booking must belong to a Property"]
  },
   user:{
    type:mongoose.Schema.ObjectId,
    red:"User",
    required:[true,"Booking must belong to a User"]
  },
  price:{
    type:Number,
    required:[true,"Booking must have price"]
  },
  createdAt:{
    type:Date,
    dafault:Date.now()
  },
  paid:{
    type:Boolean,
    dafault:true
  },
  fromDate:{
    type:Date ,
  },
  toDate:{
    type:Date,
  },
  guests:{
    type:Number
  },
  numberOfnights:{
    type:Number
  }

},
{timestamps:true}
);

bookingSchema.pre(/^find/,function(next){
  this.populate("user".populate({
    path:this.property,
    select: " maximumGuest images propertName address"
  }));

  next();
})
const Booking =mongoose.model("Booking", bookingSchema) ;

export{Booking} ;