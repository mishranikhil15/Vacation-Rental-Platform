const mongoose=require('mongoose')

const guestSchema =  mongoose.Schema({
    name: String,
    email:String,
    password: String,
    gender: String,
    date_of_birth: Date,
    bio: String,
  });
  
  const Guest = mongoose.model('Guest', guestSchema);

  module.exports={
    Guest
  }