import { motion } from 'framer-motion';
import { Target, Cpu, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Target,
    title: "1. Choose Your Goal",
    description: "Specify your target career goal, current skill level, and weekly study schedule.",
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-400"
  },
  {
    icon: Cpu,
    title: "2. AI Roadmap Build",
    description: "Our Gemini-powered engine formulates a step-by-step custom curriculum.",
    color: "from-purple-500/20 to-transparent",
    iconColor: "text-purple-400"
  },
  {
    icon: TrendingUp,
    title: "3. Complete & Track",
    description: "Check off milestones, write notes, build suggested projects, and achieve your targets.",
    color: "from-cyan-500/20 to-transparent",
    iconColor: "text-cyan-400"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 relative bg-[#020617]" id="about">
      {/* Background radial highlight */}
      <div className="absolute top-[30%] left-[20%] w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Your journey to mastering new skills is structured into three simple, automated steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {/* Connecting line for desktop layouts */}
          <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 z-0" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center p-6 bg-white/[0.02] border border-white/[0.06] rounded-[24px] backdrop-blur-md"
            >
              {/* Step Node */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-b ${step.color} border border-white/10 flex items-center justify-center mb-6`}>
                <step.icon className={`w-8 h-8 ${step.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
