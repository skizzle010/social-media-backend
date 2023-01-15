require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json())

const mongoose = require('mongoose');
const router  = require('./routes/user');
mongoose.set('strictQuery', false)

const uri = process.env.MONGO_URL;

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected to MongoDB")
    } catch (error){    
        console.log(error)
    }
}

connect();

app.use("/user", router);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});