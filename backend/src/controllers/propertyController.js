//  get all properties
//get property based on id 
import { status } from "init";
import { Property } from "../Models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/ImagekitIO.js";

// get all property
const getProperties = async(req ,res)=>{
  try{
const features = new APIFeatures(Property.find() , req.querty).filter()
.search()
.paginate()

const allProperties = await Property.find();
const doc = await features.query;
res.status(200).json({
  status:"success",
  no_of_responses:doc.length,
data:doc
})
  }
  catch(error){
    console.error("Error in searching propertyies",error) 
res.status(500).json({error:"Interval server Error"})
  }
}

const getProperty = async(req, res)=>{
  try{
const property = await Property.findById(req.params.id);
res.status(200).json({
  status:"success",
  data:property,
})
  }
  catch(error){
res.status(404).json({
  status:"fail",
  message:error.message 
})
  }
}
export {getProperties, getProperty}
