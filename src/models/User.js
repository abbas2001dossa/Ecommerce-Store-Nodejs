const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true 
    },
    email:{
        type: String,
        required:true
    },
    passwordHash:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        required:false,
        default:false
    },
    street:{
        type: String,
        required:false,
        default:''
    },
    apartment:{
        type: String,
        required:false,
        default:''
    },
    zip:{
        type: String,
        required:false,
        default:''
    },
    city:{
        type: String,
        required:false,
        default:''
    },
    country:{
        type: String,
        required:false,
        default:''
    }

});



userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

userSchema.set('toJSON',{
    virtuals:true
});

const User = mongoose.model("User",userSchema);
module.exports=User;



