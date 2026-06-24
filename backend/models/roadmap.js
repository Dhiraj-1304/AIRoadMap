import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema(
  {
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Registration",
    required: true
  },
    careerGoal : {
      type: String,
      required: true,
    },
    skillLevel : {
      type: String,
      required: true,
    },
    duration : {
      type : String,
      required : true,
    },
    weeklyHours : {
      type : Number,
      required : true,
    },
    interests : {
      type : [String],
      required : true,
    },
    roadmap : {
      type : Object,
    },
    progress : {
      type : Number,
      default : 0,
    },
    completephase : [
      {
        type : Number,
      }
    ]
  },
    {
      timestamps : true,
    } 
);
const roadMap = mongoose.model("roadmap", roadmapSchema);
export default roadMap;