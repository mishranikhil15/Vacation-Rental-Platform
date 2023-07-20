const mongoose=require('mongoose')

const hostSchema =  mongoose.Schema({
    name: String,
    password: String,
    email:String,
    hostStatus: String,
    location: String,
    propertyType: String,
    about: String,
    hostingSince: Number,
  });
  
  const Host = mongoose.model('Host', hostSchema);

  module.exports={
    Host
  }