import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRoadmapById, deleteRoadmap } from "../API/api";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, Edit2, Save, Download, FileText, CheckCircle, Circle, Clock, Network, Calendar, HelpCircle, BookOpen, Code2 } from "lucide-react";

const RoadmapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom UI Interactive States
  const [completedPhases, setCompletedPhases] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPhases, setEditedPhases] = useState([]);
  const [notepadText, setNotepadText] = useState("");
  const [notepadStatus, setNotepadStatus] = useState("Saved"); // Saved, Typing, Saving...

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        const data = await getRoadmapById(id);
        setRoadmap(data);
        if (data?.roadmap?.phases) {
          setEditedPhases(data.roadmap.phases);
          // Set completed phases based on completed indices if any are stored
          if (data.completephase) {
            setCompletedPhases(data.completephase);
          }
        }
        // Load saved notepad notes from localStorage
        const savedNotes = localStorage.getItem(`roadmap_notes_${id}`);
        if (savedNotes) {
          setNotepadText(savedNotes);
        }
      } catch (error) {
        console.log("Error loading roadmap details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [id]);

  // Notepad autosave simulator
  const handleNotepadChange = (e) => {
    setNotepadText(e.target.value);
    setNotepadStatus("Saving...");
    localStorage.setItem(`roadmap_notes_${id}`, e.target.value);
    setTimeout(() => {
      setNotepadStatus("Autosaved");
    }, 600);
  };

  const handleTogglePhase = (index) => {
    const newCompleted = completedPhases.includes(index)
      ? completedPhases.filter((idx) => idx !== index)
      : [...completedPhases, index];
    setCompletedPhases(newCompleted);
  };

  const handleSaveInlineEdit = () => {
    setIsEditing(false);
    // Simulating API save update with notification
    alert("Roadmap changes saved successfully!");
  };

  const handlePhaseTitleChange = (index, value) => {
    const updated = [...editedPhases];
    updated[index] = { ...updated[index], title: value };
    setEditedPhases(updated);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete this roadmap?");
    if (!confirmDelete) return;
    try {
      await deleteRoadmap(id);
      alert("Roadmap deleted successfully");
      navigate("/myroadmap");
    } catch (error) {
      console.error(error);
      alert("Failed to delete roadmap");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#020617] text-white py-20">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-t-2 border-purple-500 rounded-full" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#020617] text-white py-20 px-6">
        <h2 className="text-xl font-bold">Roadmap not found</h2>
        <Link to="/myroadmap" className="mt-4 text-purple-400 hover:text-purple-300 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to list
        </Link>
      </div>
    );
  }

  const phasesCount = editedPhases.length || 1;
  const progressPercent = Math.round((completedPhases.length / phasesCount) * 100);

  return (
    <div className="flex-1 bg-[#020617] text-white min-h-screen relative font-sans">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Primary Container */}
      <div className="max-w-[1600px] mx-auto p-6 md:p-10 lg:p-12 relative z-10 flex flex-col gap-8">
        
        {/* Navigation / Header row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate("/myroadmap")}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-purple-500/10 border-purple-500/20 text-purple-400">
                  {roadmap.skillLevel}
                </span>
                <span className="text-slate-500 text-xs flex items-center gap-1 font-mono">
                  <Calendar className="w-3.5 h-3.5" /> {roadmap.duration ? `${roadmap.duration} Months` : 'N/A'}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white mt-1.5 leading-tight">
                {roadmap.careerGoal} Learning Path
              </h1>
            </div>
          </div>

          {/* Action drawers */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => alert("Roadmap PDF export initiated...")}
              className="h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export PDF
            </button>

            {isEditing ? (
              <button
                onClick={handleSaveInlineEdit}
                className="h-10 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-purple-500/10"
              >
                <Save className="w-4 h-4" /> Save Plan
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="h-10 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Edit2 className="w-4 h-4" /> Edit Roadmap
              </button>
            )}

            <button
              onClick={handleDelete}
              className="h-10 px-4 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 rounded-xl text-xs font-semibold text-slate-400 hover:text-red-400 transition-all cursor-pointer"
              title="Delete Path"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard 2-column Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT PANEL: Dynamic Timeline Path (65% / 2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Editing alert indicator */}
            {isEditing && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
                ⚠️ Interactive Edit Mode Active: You can update the phase titles inline below, then save the plan.
              </div>
            )}

            {/* Path nodes layout */}
            <div className="space-y-6">
              {editedPhases.map((phase, idx) => {
                const isPhaseCompleted = completedPhases.includes(idx);
                return (
                  <motion.div 
                    key={idx}
                    className="relative flex gap-5 pb-8 group/details"
                  >
                    {/* Connection Line */}
                    <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/30 to-purple-500/5 group-last/details:hidden" />

                    {/* Interactive Completion Trigger Node */}
                    <div className="relative z-10 pt-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleTogglePhase(idx)}
                        className="w-10 h-10 rounded-full bg-[#020617] border border-white/10 flex items-center justify-center hover:scale-105 active:scale-95 hover:border-purple-500/50 transition-all cursor-pointer"
                      >
                        {isPhaseCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400 fill-green-400/5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 group-hover/details:text-purple-400" />
                        )}
                      </button>
                    </div>

                    {/* Timeline Node Card */}
                    <div className="flex-1">
                      <div className="p-6 rounded-[20px] bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors shadow-md flex flex-col gap-4">
                        
                        {/* Heading / Info row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {isEditing ? (
                            <input
                              type="text"
                              value={phase.title || phase.phase}
                              onChange={(e) => handlePhaseTitleChange(idx, e.target.value)}
                              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500 w-full max-w-md font-bold"
                            />
                          ) : (
                            <h3 className="text-base md:text-lg font-bold text-white leading-tight">
                              Phase {idx + 1} — {phase.title || phase.phase}
                            </h3>
                          )}
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border self-start sm:self-auto ${isPhaseCompleted ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-slate-400 border-white/5'}`}>
                            {isPhaseCompleted ? 'Finished' : 'Pending'}
                          </span>
                        </div>

                        {/* Topics */}
                        <div className="grid md:grid-cols-2 gap-6 mt-2 text-xs leading-relaxed">
                          <div>
                            <h4 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">Required Concepts</h4>
                            <ul className="space-y-2">
                              {phase.topics && phase.topics.map((t, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-slate-300">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                  <span>{t}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-4">
                            {/* Project Build */}
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1.5">Suggested Project</h4>
                              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-slate-300 flex items-start gap-2.5">
                                <Code2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                                <span>{phase.project || (phase.projects && phase.projects.length > 0 ? phase.projects[0] : 'No project details')}</span>
                              </div>
                            </div>

                            {/* Resources */}
                            <div>
                              <h4 className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">Focal Resources</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {phase.resources && phase.resources.length > 0 ? (
                                  phase.resources.map((r, ri) => (
                                    <div key={ri} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-slate-300 flex items-center gap-1.5">
                                      <BookOpen className="w-3 h-3 text-cyan-400" />
                                      <span>{r}</span>
                                    </div>
                                  ))
                                ) : (
                                  <span className="text-[10px] text-slate-500">None</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* RIGHT PANEL: Sticky Sidebar Dashboard Info (35% / 1 col) */}
          <div className="lg:col-span-1 flex flex-col gap-6 sticky top-24">
            
            {/* Radial Progress Module */}
            <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] text-center flex flex-col items-center shadow-md">
              <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-5">Current Roadmap Progress</h3>
              
              {/* Radial Circle */}
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                <svg className="absolute w-full h-full transform -rotate-90">
                  <circle cx="72" cy="72" r="54" className="stroke-white/5" strokeWidth="6" fill="transparent" />
                  <motion.circle 
                    cx="72" cy="72" r="54" 
                    className="stroke-purple-500" 
                    strokeWidth="6" 
                    fill="transparent" 
                    strokeDasharray={2 * Math.PI * 54}
                    strokeDashoffset={2 * Math.PI * 54 * (1 - progressPercent / 100)}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="text-center z-10">
                  <span className="text-3xl font-black text-white">{progressPercent}%</span>
                  <div className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">Completed</div>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed mt-2">
                You have checked off <span className="text-purple-400 font-bold font-mono">{completedPhases.length}</span> of <span className="text-white font-bold font-mono">{phasesCount}</span> learning phases.
              </div>
            </div>

            {/* Local Learning Notepad */}
            <div className="p-6 rounded-[24px] bg-white/[0.02] border border-white/[0.06] shadow-md flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">Learning Notepad</h3>
                <span className={`text-[10px] font-semibold ${notepadStatus === 'Autosaved' ? 'text-green-400' : 'text-purple-400'}`}>
                  {notepadStatus}
                </span>
              </div>
              <textarea
                value={notepadText}
                onChange={handleNotepadChange}
                placeholder="Jot down links, concepts, or reminders as you work through your roadmap here..."
                rows="6"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all resize-none leading-relaxed"
              />
              <div className="text-[10px] text-slate-500 leading-snug">
                📝 Changes to the notepad automatically sync with local browser storage.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default RoadmapDetails;