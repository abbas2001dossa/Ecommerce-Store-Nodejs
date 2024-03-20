// express is the web server 
const express = require('express');
const app = express();
require('dotenv/config');
const bodyParser =require('body-parser');
const morgan=require('morgan');
const cors=require('cors');


app.use(cors());
app.options('*',cors());


// middlewares
app.use(bodyParser.json());   // will understand data from frontend is in jaon format 
app.use(morgan('tiny'));




const api= process.env.API_URL;
// api is -- /api/v1

const userRoutes = require('./routes/UserRoute');
app.use(`${api}/user`,userRoutes);

const productRoutes = require('./routes/ProductRoute');
app.use(`${api}/products` , productRoutes);

const categoryRoutes = require('./routes/CategoryRoute');
app.use(`${api}/categories`,categoryRoutes);


// connection to mongodb
const connectToMongoDb=require('./Connection');
connectToMongoDb();


// serrver will listen to api requests on thjis port with local host - 
// runnning on http://localhost:3000
app.listen(3000,()=>{
    console.log("This web server is listening on port 3000");
});