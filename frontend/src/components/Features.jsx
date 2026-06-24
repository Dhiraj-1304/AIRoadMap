import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Code, Activity, LineChart, Calendar } from 'lucide-react';

const features = [
  { icon: Sparkles, title: "Personalized Roadmaps", desc: "Unique paths crafted just for you." },
  { icon: Brain, title: "AI Recommendations", desc: "Smart resource suggestions based on your learning style." },
  { icon: Code, title: "Project-Based Learning", desc: "Build real-world projects to solidify your skills." },
  { icon: Activity, title: "Progress Tracking", desc: "Monitor your completion rate and skill growth." },
  { icon: LineChart, title: "Smart Skill Analysis", desc: "Identify gaps and learn exactly what you need." },
  { icon: Calendar, title: "Weekly Learning Plans", desc: "Bite-sized goals to keep you consistently learning." }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl">Everything you need to accelerate your learning journey and reach your career goals faster.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                <feature.icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
