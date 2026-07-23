import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserRoadmap, deleteRoadmap } from "../API/api";

const MyRoadmap = () => {

  const [roadmaps,setRoadmaps] =
    useState([]);

  useEffect(() => {

    const fetchRoadmaps =async () => {
      try {
        const data =  await getUserRoadmap();
        console.log(data);
        setRoadmaps(data);
      } catch(error) {
        console.log(error);
      }

    };

    fetchRoadmaps();

  }, []);

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this roadmap?"
  );

  if (!confirmDelete) return;

  try {
    await deleteRoadmap(id);

    // Remove deleted roadmap from state
    setRoadmaps((prevRoadmaps) =>
      prevRoadmaps.filter((roadmap) => roadmap._id !== id)
    );

    alert("Roadmap deleted successfully");
  } catch (error) {
    console.error(error);
    alert("Failed to delete roadmap");
  }
};

  return (
    <div className="p-8">
      <h1 className="text-3xl text-white mb-6">My Roadmaps</h1>

      {roadmaps.map((roadmap) => (
        <>
        <div className = "glass-card flex flex-row justify-between items-center px-4 m-4">
          <Link key={roadmap._id} to={`/roadmap/${roadmap._id}`}>
            <div className=" p-5 mb-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-2">
                <h2>{roadmap.careerGoal}</h2>
                <p>
                  Progress:
                  {roadmap.progress}%
                </p>
              </div>
            </div>
          </Link>
          <button
            className="p-2 border h-1/2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={() => handleDelete(roadmap._id)}
          >
            Delete
          </button>
          </div>
        </>
      ))}
    </div>
  );
};

export default MyRoadmap;