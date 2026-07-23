import { BrainCircuit, Globe, MessageCircle, Users, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-white/8 bg-[#020617] pt-16 pb-8 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">AI Roadmap</span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
            Empowering the next generation of builders with AI-generated, highly personalized learning paths. Accelerate your career.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
              <Users className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Product</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Features</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Roadmaps</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">API Details</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-4 tracking-wider uppercase">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog Post</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} AI Roadmap Generator. Designed for elite builders.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
