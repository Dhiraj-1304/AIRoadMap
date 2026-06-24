// import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const roadmapNodes = [
  { title: "HTML & CSS", status: "completed" },
  { title: "JavaScript", status: "current" },
  { title: "React", status: "upcoming" },
  { title: "Backend", status: "upcoming" },
  { title: "Deployment", status: "upcoming" }
];

const RoadmapPreview = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Interactive Roadmaps</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">A sneak peek into how your personalized curriculum is structured.</p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
          {/* Subtle grid background inside the card */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-10 text-center">Frontend Developer Roadmap</h3>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative gap-8 md:gap-0">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-10 right-10 h-0.5 bg-gray-800 z-0" />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "35%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden md:block absolute top-6 left-10 h-0.5 bg-blue-500 z-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              />

              {/* Connecting Line (Mobile) */}
              <div className="block md:hidden absolute left-6 top-10 bottom-10 w-0.5 bg-gray-800 z-0" />
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "35%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="block md:hidden absolute left-6 top-10 w-0.5 bg-blue-500 z-0 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
              />

              {roadmapNodes.map((node, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.2 }}
                  className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 w-full md:w-auto"
                >
                  <div className="bg-[#030014] rounded-full p-1">
                    {node.status === 'completed' ? (
                      <CheckCircle2 className="w-10 h-10 text-blue-500 fill-blue-500/20" />
                    ) : node.status === 'current' ? (
                      <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <div className="w-4 h-4 bg-blue-500 rounded-full" />
                      </div>
                    ) : (
                      <Circle className="w-10 h-10 text-gray-700" />
                    )}
                  </div>
                  <div className={`font-medium ${node.status === 'completed' || node.status === 'current' ? 'text-white' : 'text-gray-500'}`}>
                    {node.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapPreview;
