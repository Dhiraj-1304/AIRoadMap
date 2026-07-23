import roadMap from "../models/roadmap.js";
import generatePrompt from "../utils/generatePrompt.js";
import generateRoadmap from "../services/geminiService.js";

export const roadmapController = async(req, res)=>{
  try{
    const{
      careerGoal,
      skillLevel,
      duration,
      weeklyHours,
      interests,
    } = req.body;

    const prompt = generatePrompt({
      careerGoal ,
      skillLevel,
      duration,
      weeklyHours,
      interests,
    });
    console.log(prompt)

    let airoadmap;
    try {
      airoadmap = await generateRoadmap(prompt);
      if (!airoadmap || !airoadmap.phases) {
        throw new Error("Invalid roadmap structure returned by AI");
      }
    } catch (apiError) {
      console.warn("AI Generation failed. Falling back to local dynamic generator. Reason:", apiError.message);
      airoadmap = getFallbackRoadmap({
        careerGoal,
        skillLevel,
        duration,
        weeklyHours,
        interests,
      });
    }

    const roadmap = await roadMap.create({
      user: req.user._id,
      careerGoal,
      skillLevel,
      duration,
      weeklyHours,
      interests,
      roadmap : airoadmap,
    });

    res.status(201).json(roadmap);
  } catch (error) {
    console.error("Error creating roadmap:", error);
    res.status(500).json({ error: "Failed to create roadmap" });
  }
}

export const getUserRoadmap = async(req,res)=>{
  try{
    const roadmapData = await roadMap.find({ user: req.user._id }).sort({createdAt : -1});
    res.status(200).json(roadmapData);
  }catch(error){
    console.error("Error fetching roadmap:", error);
    res.status(500).json({error : "Failed to load the roadmap"});
  }
}

export const getFallbackRoadmap = (data) => {
  return {
    title: `Roadmap to become a ${data.careerGoal}`,
    description: `A customized learning path for a ${data.skillLevel} level student with ${data.weeklyHours} hours/week over ${data.duration}.`,
    phases: [
      {
        id: 1,
        title: "Foundations & Core Basics",
        description: "Learn the foundational principles and essential concepts.",
        duration: "2-4 weeks",
        topics: ["Introduction to core concepts", "Development environment setup", "Basic syntax and tools"]
      },
      {
        id: 2,
        title: "Intermediate Concepts & Integration",
        description: "Deep dive into more advanced features and build simple projects.",
        duration: "4-8 weeks",
        topics: ["Data handling and APIs", "State management", "Project styling and layout"]
      },
      {
        id: 3,
        title: "Advanced Specialization & Production",
        description: "Final optimization, testing, and deployment of your skills.",
        duration: "4 weeks",
        topics: ["Testing and debugging", "Deployment & CI/CD", "Advanced patterns and best practices"]
      }
    ]
  };
};

export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await roadMap.findById(req.params.id);
    console.log(roadmap);
    res.json(roadmap);
  } catch (error) {
    console.error("Error fetching roadmap by ID:", error);
    res.status(500).json({ error: "Failed to fetch roadmap by ID" });
  }
  
};

export const deleteRoadmapById = async (req, res) => {
  try {
    const deletedRoadmap = await roadMap.findById(req.params.id);
    if (!deletedRoadmap) {
      console.log("RoadMap not found")
      return res.status(404).json({ error: "Roadmap not found" });
    }
    if(deletedRoadmap.user.toString() !== req.user._id.toString()){
      return res.status(403).json({ error: "You are not authorized to delete this roadmap" });
    }
    await roadMap.deleteOne({ _id: req.params.id });
    res.json({ message: "Roadmap deleted successfully", roadmap: deletedRoadmap });
  } catch (error) {
    console.error("Error deleting roadmap by ID:", error);
    res.status(500).json({ error: "Failed to delete roadmap by ID" });
  }
};

// export default roadmapController;