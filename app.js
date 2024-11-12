const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("Database Connect");
    
})
.catch(error =>{
    console.error(error);
    
})




let app = express();
let PORT = process.env.port || 5001


app.listen(PORT,()=>{
console.log(`Server is starting at port: ${PORT}`);

})
