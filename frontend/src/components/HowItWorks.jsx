import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: "1. Choose Your Goal",
    description: "Tell us your career aspirations, current skill level, and how much time you can commit to learning.",
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    icon: Cpu,
    title: "2. AI Generates Your Roadmap",
    description: "Our AI analyzes your profile and generates a step-by-step, highly personalized learning path.",
    color: "from-purple-500/20 to-transparent",
    iconColor: "text-purple-400"
  },
  {
    icon: TrendingUp,
    title: "3. Track Your Progress",
    description: "Follow your roadmap, complete projects, and track your skills as you level up towards your goal.",
    color: "from-cyan-500/20 to-transparent",
    iconColor: "text-cyan-400"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 relative" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Your journey to mastering new skills is just three simple steps away.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-24 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 z-0" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className={`w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-6 bg-gradient-to-b ${step.color} border border-white/5`}>
                <step.icon className={`w-10 h-10 ${step.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
