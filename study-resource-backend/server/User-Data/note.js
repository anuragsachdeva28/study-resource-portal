var mongoose=require('mongoose');

var Notetxt=mongoose.model('Notetxt',{
   notetxt:{
    type:String,
    required:true,
    trim:true
  },
  sem:{
    type:Number,
    enum:[1,2,3,4,5,6,7,8],
    required:[true,'Field Necessary'],
    minlength:1
  },
  _creator:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
});

module.exports={
  Notetxt
}
