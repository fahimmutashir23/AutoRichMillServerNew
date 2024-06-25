const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, 'Please Enter Your Name']
    },
    phone: {
        type: Number,
        required : [true, 'Please Enter Your Phone']
    },
    email : {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    role : {
        type: String,
        required: [true, 'Please Enter Your Role']
    }
}, {timestamps: true})


userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

  module.exports = mongoose.model('User', userSchema);



