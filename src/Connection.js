const mongoose = require('mongoose');
require('dotenv/config');
const DATABASE_USERNAME=process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD=process.env.DATABASE_PASSWORD;


const Connection =async () => {
    try{
        // establishing connection 
        mongoose.connect(
            `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@ecommercecluster.5cr0ozr.mongodb.net/?retryWrites=true&w=majority&appName=EcommerceCluster`, 
            {
                useNewUrlParser : true , 
                useUnifiedTopology : true ,
                dbName: 'eshop' 
            }
        )
        .then(()=>{
            console.log(" Connected To MongoDB E-commerce Database");
        }).catch((err)=>{
            console.log( "Error Ocurred" , err);
        });
    }
    catch(error){
      console.log("Error Ocurred in Connection.js File");
    }
  }
  
  module.exports =Connection;