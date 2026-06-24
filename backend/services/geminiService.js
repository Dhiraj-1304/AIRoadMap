import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(
  // process.env.GEMINI_KEY
  process.env.GEMINI_KEY
)
// console.log(process.env.GEMINI_KEY)
const model = genAI.getGenerativeModel({
  model : "gemini-2.5-flash",
  generationConfig: { responseMimeType: "application/json" }
});

const generateRoadmap = async (prompt) => {
  try{
     if (!prompt) {
      throw new Error("Prompt is missing");
    }
    const response = await model.generateContent(prompt);
    const result = response.response.text();
    
    // Clean up potential markdown code block wrappers
    // let cleanText = result.trim();
    // if (cleanText.startsWith("```json")) {
    //   cleanText = cleanText.substring(7);
    // } else if (cleanText.startsWith("```")) {
    //   cleanText = cleanText.substring(3);
    // }
    // if (cleanText.endsWith("```")) {
    //   cleanText = cleanText.substring(0, cleanText.length - 3);
    // }
    // cleanText = cleanText.trim();
    console.log("Raw AI Response:", result);
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
    console.error("Error generating roadmap:", error);
    throw error;
  }
};

export default generateRoadmap;
