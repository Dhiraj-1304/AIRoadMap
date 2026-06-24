import  { useState } from 'react';
import ConfigForm from '../components/AIGenerator/ConfigForm';
import RoadmapPreview from '../components/AIGenerator/RoadmapPreview';
import API from '../API/api.js';

const AIGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);

  // const handleGenerate = (formData) => {
  //   setIsGenerating(true);
  //   setIsGenerated(false);
    
  //   // Simulate AI Generation Process
  //   setTimeout(() => {
  //     setIsGenerating(false);
  //     setIsGenerated(true);
  //   }, 4500); // 4.5 seconds of simulated thinking
  // };


  const handleGenerate = async (formData) => {
    try{
      setIsGenerating(true);
      setIsGenerated(false);
      const response = await API.post('/roadmap/generate', formData);
      console.log(formData);
      console.log(response.data);
      setRoadmapData(response.data.roadmap);

      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      // Handle error (e.g., show notification)
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden max-w-[1600px] w-full mx-auto">
      {/* Background Animated Grids & Glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Panel - AI Config Form */}
      <div className="w-full md:w-[35%] lg:w-[30%] border-b md:border-b-0 md:border-r border-white/10 relative z-10 bg-[#030014]/50 backdrop-blur-sm overflow-y-auto">
        <ConfigForm 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
          isGenerated={isGenerated} 
        />
      </div>

      {/* Right Panel - Roadmap Preview */}
      <div className="w-full md:w-[65%] lg:w-[70%] relative z-10 overflow-y-auto bg-[#030014]/30 backdrop-blur-sm p-4 md:p-8">
        <RoadmapPreview 
          isGenerating={isGenerating} 
          isGenerated={isGenerated} 
          roadmapData={roadmapData}
        />
      </div>
    </div>
  );
};

export default AIGenerator;
