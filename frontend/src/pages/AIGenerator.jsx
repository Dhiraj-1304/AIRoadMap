import { useState } from 'react';
import ConfigForm from '../components/AIGenerator/ConfigForm';
import RoadmapPreview from '../components/AIGenerator/RoadmapPreview';
import API from '../API/api.js';
import { motion } from 'framer-motion';

const AIGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);

  const handleGenerate = async (formData) => {
    try {
      setIsGenerating(true);
      setIsGenerated(false);
      const response = await API.post('/roadmap/generate', formData);
      console.log(formData);
      console.log(response.data);
      setRoadmapData(response.data.roadmap);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden max-w-[1600px] w-full mx-auto bg-[#020617]">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <motion.div 
        animate={{ scale: [1, 1.1, 1] }} 
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }} 
        transition={{ duration: 12, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" 
      />

      {/* Left Panel - AI Config Form */}
      <div className="w-full md:w-[35%] lg:w-[30%] border-b md:border-b-0 md:border-r border-white/[0.08] relative z-10 bg-[#020617]/50 backdrop-blur-md overflow-y-auto shrink-0">
        <ConfigForm 
          onGenerate={handleGenerate} 
          isGenerating={isGenerating} 
          isGenerated={isGenerated} 
        />
      </div>

      {/* Right Panel - Roadmap Preview */}
      <div className="w-full md:w-[65%] lg:w-[70%] relative z-10 overflow-y-auto bg-white/[0.01] backdrop-blur-sm p-6 md:p-10 flex flex-col justify-start">
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
