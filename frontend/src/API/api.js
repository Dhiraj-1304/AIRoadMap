
import API from "./axiosInstance";

export const generateRoadmap = async (roadmapData) => {
  const response = await API.post("/roadmap/generate",roadmapData);

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/registerUser", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/loginUser", userData);
  return response.data;
};

export const refreshToken = async (refreshToken) => {
  const response = await API.post("/auth/refreshToken", { refreshToken });
  return response.data;
};

export const logoutUser = async () => {
  const response = await API.post("/auth/logoutUser");

  return response.data;
};

export const getUserRoadmap = async () => {
  const response = await API.get(`/roadmap/myroadmap/`);
  return response.data;
}
export const getRoadmapById = async (id) => {
   console.log("Fetching roadmap:", id);
  const response = await API.get(`/roadmap/${id}`);
  console.log("Response:", response.data);
  return response.data;
}
export default API;