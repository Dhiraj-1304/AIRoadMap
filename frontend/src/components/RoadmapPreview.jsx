import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

const roadmapNodes = [
  { title: "HTML & CSS", status: "completed", desc: "Semantic markup, styling fundamentals, Flexbox & Grid." },
  { title: "JavaScript", status: "current", desc: "DOM interactions, Async/Await, Array methods & ES6+ features." },
  { title: "React Engine", status: "upcoming", desc: "Hooks, state management, component cycles & virtual DOM." },
  { title: "Backend API", status: "upcoming", desc: "Node.js, Express framework, database schemas & API routing." },
  { title: "Deployment", status: "upcoming", desc: "CI/CD pipelines, SSL setups, DNS routing & cloud hosting." }
];

const RoadmapPreview = () => {
  return (
    <section className="py-24 px-6 relative bg-[#020617]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Interactive Roadmaps
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Get a preview of how your AI-customized learning curriculum will be structured.
          </p>
        </div>

        <div className="relative rounded-[32px] bg-white/[0.02] border border-white/[0.06] p-8 md:p-12 overflow-hidden shadow-2xl">
          {/* Subtle grid background inside the card */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-12 text-center">Frontend Developer Sample Path</h3>
            
            <div className="flex flex-col md:flex-row items-start md:items-stretch justify-between relative gap-8 md:gap-4">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-7 left-10 right-10 h-0.5 bg-white/5 z-0" />
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "35%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden md:block absolute top-7 left-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 z-0 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
              />

              {/* Connecting Line (Mobile) */}
              <div className="block md:hidden absolute left-6 top-10 bottom-10 w-0.5 bg-white/5 z-0" />
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "35%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="block md:hidden absolute left-6 top-10 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 z-0"
              />

              {roadmapNodes.map((node, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative z-10 flex md:flex-col items-start md:items-center gap-4 md:gap-4 w-full md:w-1/5 text-left md:text-center"
                >
                  <div className="bg-[#020617] rounded-full p-2 border border-white/[0.04]">
                    {node.status === 'completed' ? (
                      <CheckCircle2 className="w-10 h-10 text-blue-500 fill-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]" />
                    ) : node.status === 'current' ? (
                      <div className="w-10 h-10 rounded-full border-2 border-purple-500 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(139,92,246,0.4)] bg-purple-500/5">
                        <div className="w-3.5 h-3.5 bg-purple-500 rounded-full" />
                      </div>
                    ) : (
                      <Circle className="w-10 h-10 text-slate-700" />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold ${node.status === 'completed' || node.status === 'current' ? 'text-white' : 'text-slate-500'}`}>
                      {node.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-[150px] leading-normal hidden md:block">
                      {node.desc}
                    </p>
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
