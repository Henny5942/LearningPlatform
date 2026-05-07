const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  //   id: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  username:{
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true
  },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);