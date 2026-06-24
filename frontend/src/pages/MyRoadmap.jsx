import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserRoadmap } from "../API/api";

const MyRoadmap = () => {

  const [roadmaps,setRoadmaps] =
    useState([]);

  useEffect(() => {

    const fetchRoadmaps =
      async () => {

      try {

        const data =
          await getUserRoadmap();

        console.log(data);

        setRoadmaps(data);

      } catch(error) {

        console.log(error);

      }

    };

    fetchRoadmaps();

  }, []);

  return (

    <div className="p-8">

      <h1 className="text-3xl text-white mb-6">
        My Roadmaps
      </h1>

      {
        roadmaps.map((roadmap)=>(
          <Link
            key={roadmap._id}
            to={`/roadmap/${roadmap._id}`}
          >

            <div className="glass-card p-5 mb-4">

              <h2>
                {roadmap.careerGoal}
              </h2>

              <p>
                Progress:
                {roadmap.progress}%
              </p>

            </div>

          </Link>
        ))
      }

    </div>
  );
};

export default MyRoadmap;