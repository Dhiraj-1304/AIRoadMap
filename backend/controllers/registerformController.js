import bycrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import Registration from "../models/registerForm.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export const registerUser = async (req,res)=>{
  try{
    const {name, email, password} = req.body;
    // Check if user already exists
    const existingUser = await Registration.findOne({email});
    if(existingUser){
      return res.status(400).json({message : "User already exists"});
    }
    // Hash the password
    const hashedPassword = await bycrypt.hash(password, 10);
    // Create new User
    const newUser = new Registration({name: name, email: email,password : hashedPassword});
    await newUser.save();
    res.status(201).json({
      message : "User registered successfully",
      redirectTo : "/login", 
      success : true});
  }catch(err){
    console.log(err)
    console.error("Error registering user:", err);
    return res.status(500).json({error : "Failed to register user"});
  }
}


export const loginUser = async (req,res)=>{
  try{
    const {email, password} = req.body;
    // Check if user exists
    const user = await Registration.findOne({email});
    if(!user){
      return res.status(400).json({message : "Invalid email or password"});
    }
    // Check if password is correct
    const isMatch = await bycrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message : "Invalid email or password"});
    }
      // Generate JWT tokens
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);
      user.refreshToken = refreshToken;
      await user.save();
      res.status(200).json(
      {
        message : "Login successful", 
        accessToken, 
        refreshToken,
        redirectTo : "/generate",
        success : true
      });
  }catch(err){
    console.log(err)
    console.error("Error logging in user:", err);
    return res.status(500).json({error : "Failed to login user"});
  }
}

export const refreshToken = async(req, res)=>{
  try{
    const { refreshToken} = req.body;
    if(!refreshToken){
      return res.status(401).json({message : "No refresh token provided"});
    }
    const user = await Registration.findOne({refreshToken});
    if(!user){
      return res.status(403).json({message : "Invalid refresh token"});
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET,(err,decoded)=>{
      if(err){
        return res.status(403).json({message : "Invalid refresh token"});
      }
      const accessToken = generateAccessToken(user._id);
      res.status(200).json({accessToken});
    }
    )
  }catch(err){
    console.log(err)
    console.error("Error refreshing token:", err);
    return res.status(500).json({error : "Failed to refresh token"});
  }
}

export const logoutUser = async(req,res) =>{
  try{
    const user = await Registration.findById(req.user._id);
    user.refreshToken = null;
    await user.save();
    res.status(200).json({message : "Logout successful"});
  }catch(err){
    console.log(err)
    console.error("Error logging out user:", err);
    return res.status(500).json({error : "Failed to logout user"});
  }
}