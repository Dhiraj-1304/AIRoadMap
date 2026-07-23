import { motion } from 'framer-motion';
import { Sparkles, Brain, Code, Activity, LineChart, Calendar } from 'lucide-react';

const features = [
  { icon: Sparkles, title: "Personalized Roadmaps", desc: "Unique pathways crafted explicitly for your goals and timeline." },
  { icon: Brain, title: "AI-Powered Modules", desc: "Intelligent resource parsing mapped to your unique learning style." },
  { icon: Code, title: "Project Suggestions", desc: "Build robust, real-world portfolio projects to cement theories." },
  { icon: Activity, title: "Progress Checkpoints", desc: "Easily monitor completion milestones, streak metrics, and updates." },
  { icon: LineChart, title: "Smart Curriculum Flow", desc: "Logical phase structure that avoids learning stagnation." },
  { icon: Calendar, title: "Flexible Learning Plans", desc: "Weekly timelines adjusted to fit your specific availability." }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative bg-[#020617]">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Powerful Features
          </h2>
          <p className="text-slate-400 max-w-xl text-sm md:text-base leading-relaxed">
            Everything you need to accelerate your learning journey and reach your career milestones faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 rounded-[24px] bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-purple-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-purple-500/10 transition-colors">
                <feature.icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
