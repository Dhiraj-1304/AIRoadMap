import jwt from "jsonwebtoken";
import Registration from "../models/registerForm.js";


const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({message : "Unauthorized"});
  }

  const token = authHeader.split(" ")[1];

  try{
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    // req.user = decoded.id;
    req.user =  await Registration.findById(decoded.id).select("-password"); 
    // fetch user details from the database and attach to req.user
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({message : "Invalid token"});
  }
}

export default protect;