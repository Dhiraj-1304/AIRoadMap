import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    name : {
      type : String,
      required : true,
    },
    email : {
      type : String,
      required : true,
      unique : true
    },
    password : {
      type : String,
      required : true,
      minlength : 6
    },
    refreshToken : {
      type : String,
    }
  }
)

const Registration = mongoose.model("Registration", registrationSchema);
export default Registration;