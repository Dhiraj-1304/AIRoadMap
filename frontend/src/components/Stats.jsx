import { motion } from 'framer-motion';

const stats = [
  { value: "10+", label: "Career Paths", desc: "Formulated paths matching popular roles" },
  { value: "500+", label: "Learning Resources", desc: "Curated playlists, modules, and docs" },
  { value: "AI", label: "Powered Engine", desc: "Dynamic prompts tailored to your timeline" },
  { value: "100%", label: "Personalized Path", desc: "Adapts to your current level and targets" }
];

const Stats = () => {
  return (
    <section className="py-16 border-y border-white/[0.06] bg-[#0B1120]/30 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors"
            >
              <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mb-0.5">{stat.label}</div>
              <div className="text-xs text-slate-400 leading-relaxed">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
