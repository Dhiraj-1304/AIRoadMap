import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserRoadmap, deleteRoadmap } from "../API/api";
import { motion } from 'framer-motion';
import { Search, Grid, List, Trash2, ArrowRight, BookOpen, Clock, Calendar, CheckSquare, Sparkles, TrendingUp } from 'lucide-react';

const MyRoadmap = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [sortBy, setSortBy] = useState("newest"); // newest, progress

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await getUserRoadmap();
        setRoadmaps(data || []);
      } catch(error) {
        console.log("Error loading roadmaps:", error);
      }
    };
    fetchRoadmaps();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete this roadmap?"
    );
    if (!confirmDelete) return;

    try {
      await deleteRoadmap(id);
      setRoadmaps((prev) => prev.filter((r) => r._id !== id));
      alert("Roadmap deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete roadmap");
    }
  };

  // Filter & Sort Logic
  const filteredRoadmaps = roadmaps
    .filter(r => r.careerGoal?.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress;
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    });

  // Calculate Metrics
  const totalRoadmaps = roadmaps.length;
  const completedPaths = roadmaps.filter(r => r.progress === 100).length;
  const avgProgress = totalRoadmaps > 0 
    ? Math.round(roadmaps.reduce((acc, curr) => acc + (curr.progress || 0), 0) / totalRoadmaps) 
    : 0;

  return (
    <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] w-full mx-auto bg-[#020617] min-h-screen text-white relative">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">My Roadmaps</h1>
          <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">Manage your saved paths, view details, and track your ongoing milestones.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/generate")}
          className="h-11 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" /> New AI Roadmap
        </motion.button>
      </div>

      {/* Metrics Row */}
      {totalRoadmaps > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Total Paths</div>
              <div className="text-xl font-bold mt-0.5">{totalRoadmaps}</div>
            </div>
          </div>

          <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Completed Paths</div>
              <div className="text-xl font-bold mt-0.5">{completedPaths}</div>
            </div>
          </div>

          <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Avg Progress</div>
              <div className="text-xl font-bold mt-0.5">{avgProgress}%</div>
            </div>
          </div>

          {/* <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/[0.06] flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">Active Streak</div>
              <div className="text-xl font-bold mt-0.5">5 Days 🔥</div>
            </div>
          </div> */}
        </div>
      )}

      {/* Filter Toolbar */}
      {totalRoadmaps > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/[0.06] mb-6">
          {/* Search */}
          <div className="relative max-w-xs w-full flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Filter by goal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/80 transition-all placeholder-slate-500"
            />
          </div>

          {/* Sort / Grid Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
              >
                <option value="newest" className="bg-[#020617]">Newest First</option>
                <option value="progress" className="bg-[#020617]">Progress %</option>
              </select>
            </div>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => setIsGridView(true)}
                className={`p-1.5 rounded-lg transition-colors ${isGridView ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`p-1.5 rounded-lg transition-colors ${!isGridView ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main List / Grid Layout */}
      {filteredRoadmaps.length > 0 ? (
        <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredRoadmaps.map((roadmap) => (
            <motion.div
              key={roadmap._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <Link to={`/roadmap/${roadmap._id}`}>
                <div className={`p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/5 hover:bg-white/[0.04] transition-all duration-300 relative ${isGridView ? 'flex flex-col justify-between min-h-[220px]' : 'flex flex-row items-center justify-between gap-6'}`}>
                  
                  {/* Card Main Info */}
                  <div className={isGridView ? "" : "flex-1"}>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-blue-500/10 border-blue-500/20 text-blue-400">
                        {roadmap.skillLevel}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {roadmap.duration ? `${roadmap.duration} Mo` : 'N/A'}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-white leading-tight group-hover:text-purple-400 transition-colors">
                      {roadmap.careerGoal}
                    </h3>

                    {/* Progress details */}
                    <div className="mt-4">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="text-slate-400 font-semibold">Progress</span>
                        <span className="font-mono font-bold text-purple-400">{roadmap.progress || 0}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${roadmap.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions column / row */}
                  <div className={`flex items-center justify-between border-t border-white/5 pt-4 mt-4 ${isGridView ? 'w-full' : 'shrink-0 gap-3 border-t-0 pt-0 mt-0'}`}>
                    <span className="text-xs text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5 font-bold">
                      View roadmap <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(roadmap._id, e)}
                      className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all cursor-pointer"
                      title="Delete roadmap"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty State Illustration */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center text-center py-20 border border-dashed border-white/10 rounded-[32px] bg-white/[0.005] max-w-2xl mx-auto mt-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Sparkles className="w-7 h-7 text-slate-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No AI Roadmaps Generated</h3>
          <p className="text-slate-400 text-xs max-w-xs leading-relaxed mb-8">
            Create your very first AI-guided personalized curriculum in seconds. Specify your goal, pick interests, and start.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/generate")}
            className="px-6 py-3 bg-white text-black hover:bg-slate-100 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-white/5"
          >
            Create First Roadmap <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default MyRoadmap;