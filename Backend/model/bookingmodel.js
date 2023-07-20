const mongoose=require('mongoose')

const bookingSchema =  mongoose.Schema({
    property_id: mongoose.Schema.Types.ObjectId,
    guest_id: mongoose.Schema.Types.ObjectId,
    check_in_date: Date,
    check_out_date: Date,
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);

  module.exports={
    Booking
  }