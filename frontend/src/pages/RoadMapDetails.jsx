import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RoadmapPreview from "../components/AIGenerator/RoadmapPreview";
import { getRoadmapById } from "../API/api";

const RoadmapDetails = () => {
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const data = await getRoadmapById(id);

        console.log("Fetched Data:", data);

        setRoadmap(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoadmap();
  }, [id]);

  if (!roadmap) {
    return <h1>Loading...</h1>;
  }

  const roadmapData = {
    ...roadmap.roadmap,
    title : roadmap.title,
    duration: roadmap.duration,
    weeklyHours: roadmap.weeklyHours,
  };

  return (
    <RoadmapPreview
      isGenerating={false}
      isGenerated={true}
      roadmapData={roadmapData}
    />
  );
};

export default RoadmapDetails;