const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");


const registerUser = asyncHandler(async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
      res.status(400).json({message:"plz provide all required fields"})
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
      res.status(400).json({message:"user already exist"})
    }
    const user=await User.create({
      name,
      email,
      password
    })
    res.status(201).json({user,token: generateToken(user._id),message:"User created successfully"})
  }
  catch(error){
    res.status(400);
    throw new Error(error.message);
  }
});

const authUser = asyncHandler(async (req, res) => {
  try {
    const{email,password}=req.body;
    if(!email || !password){
      res.status(400).json({message:"plz provide all required fields"})
    }
    const user =await User.findOne({email});
    if(!user){
          res.status(400).json({message:"user not found"})
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
          res.status(400).json({message:"invalid credentials"})
        }
        res.status(200).json({user,token: generateToken(user._id),message:"User logged in successfully"})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

module.exports = { registerUser, authUser };