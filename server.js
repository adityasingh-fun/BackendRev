const express = require('express');
const mongoose = require('mongoose');

const app = express();
const mongobdURL = "mongodb+srv://chaudharyaditya41:xIIaFbMscNbxbMOG@fullstack-cluster.ahasqgz.mongodb.net/?retryWrites=true&w=majority&appName=fullstack-cluster";

const connectDB = async ()=>{
    try{
        await mongoose.connect(mongobdURL);
    console.log("MongoDB connected successfully");
    }
    catch(error){
        console.log(error.message);
    }
}
connectDB();

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        maxLength:14,
        minLength:3
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        match:/@/
    },
    age:{
        type:Number,
        min:18,
        max:65
    },
    gender:{
        type:String,
        enum:["male","female","others"]
    }
},{timestamps:true});

const user = mongoose.model("user",userSchema);

const createUser = async ()=>{
    const result = await user.create({
        username:"aditya",
        email:"adityagmail.com",
        age:28,
        gender:"male"
    })
    console.log(result);
}

createUser();

const PORT = 8082;
app.listen(PORT,()=>{
    console.log(`Express App running on PORT, ${PORT}`);
})