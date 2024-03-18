const Category = require('../models/Category');

exports.addCategory= async (name,icon,color)=>{
    const newCategory = new Category ({
        name:name,
        icon:icon,
        color:color
    });
    await newCategory.save();

    if(newCategory){return newCategory;}
    return null;
}

exports.deleteCategory = async (id) => {
    try {
        const category = await Category.findByIdAndDelete(id);
        if (category) {
            console.log(category);
            return category;
        } else {
            return null;
        }
    } catch (err) {
        // Handle errors, if any
        console.error("Error deleting category:", err);
        return null;
    }
}

exports.getCateogries = async ()=>{
    const categories =await Category.find();
    if(categories.length > 0 ){
        return categories;
    }
    return null;
}

exports.getCategoryById = async (id)=>{
    console.log("THis is ID - ", id);
    try{
        const category= await Category.findById(id);
        if(category){return category;}
        return null;
    }
    catch(err){
        return null;
    }
    
}

exports.updateCategory= async (id,name,icon,color)=>{
    try{
        const updateCategory = await Category.findByIdAndUpdate(id,
            {
                name:name,
                icon:icon,
                color:color
            },
            {new:true}
            );
        await updateCategory.save();
        if(updateCategory){return updateCategory;}
        return null;
    }
    catch(err){return null;}    
}

