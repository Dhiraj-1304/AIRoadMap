import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import registerRoutes from "./routes/registerRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/auth',registerRoutes);


const PORT = process.env.PORT || 5000;

const connectDB =() =>{
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log("MongoDB Connected Sucessfully");
  }).catch((err)=>{
    console.log("MongoDB Connection failure");
    console.log(err);
  })
}
app.get('/', (req, res)=>{
    res.send("Hello World");
})


// start the server

const StartServer =async()=>{
  try{
    connectDB();
    app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT} `)
    })
  }catch(err){
    console.log("Error starting the server");
    console.log(err);
  };
}

StartServer();
