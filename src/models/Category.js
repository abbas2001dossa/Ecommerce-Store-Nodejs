const mongoose=require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String,
        required:false
    },
    color:{
        type:String,
        required:false
    }
});


const Category = mongoose.model("Category",categorySchema);
module.exports = Category;