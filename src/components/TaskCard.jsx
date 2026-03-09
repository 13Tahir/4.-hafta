import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, Activity, Trash2, Calendar, User, Timer, ShieldCheck } from 'lucide-react';

const TaskCard = ({ task, onDelete, onStatusUpdate }) => {
    const [isClaiming, setIsClaiming] = useState(false);
    const [claimName, setClaimName] = useState('');

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Bekliyor':
                return 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10 neon-text-pending';
            case 'Aktif':
                return 'border-green-500/50 text-green-400 bg-green-500/10 neon-text-active';
            case 'Tamamlandı':
                return 'border-blue-500/50 text-blue-400 bg-blue-500/10 neon-text-complete';
            default:
                return 'border-gray-500/50 text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Bekliyor': return <Clock size={14} />;
            case 'Aktif': return <Activity size={14} />;
            case 'Tamamlandı': return <CheckCircle size={14} />;
            default: return null;
        }
    };

    const handleClaimSubmit = (e) => {
        e.preventDefault();
        if (!claimName.trim()) return;
        onStatusUpdate(task.id, 'Aktif', claimName);
        setIsClaiming(false);
        setClaimName('');
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            whileHover={{
                scale: 1.02,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            transition={{
                layout: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }}
            className="glass-card p-5 group flex flex-col justify-between relative overflow-hidden"
        >
            {/* Animated Glow Backdrop on Hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <div className="mb-4 relative z-10">
                <div className="flex justify-between items-start">
                    <motion.h3
                        layout="position"
                        className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                    >
                        {task.title}
                    </motion.h3>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="p-1.5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 text-red-400 rounded-lg hover:rotate-12"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
                <motion.p
                    layout="position"
                    className="text-gray-400 text-sm mt-2 line-clamp-2"
                >
                    {task.description}
                </motion.p>
                <motion.div
                    layout="position"
                    className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5"
                >
                    <div className="flex items-center gap-2 text-xs text-purple-400 font-medium">
                        <User size={14} className="opacity-70" />
                        <span>Ekleyen: <span className="text-white/90">{task.author}</span></span>
                    </div>
                    {task.assignee && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-2 text-xs text-green-400 font-medium"
                        >
                            <ShieldCheck size={14} className="opacity-70" />
                            <span>Sorumlu: <span className="text-white/90">{task.assignee}</span></span>
                        </motion.div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
                        <Timer size={14} className="opacity-70" />
                        <span>Hedef: <span className="text-white/90">{new Date(task.dueDate).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })}</span></span>
                    </div>
                </motion.div>

                <motion.div
                    layout="position"
                    className="flex items-center gap-1.5 mt-3 text-[10px] text-gray-500 font-medium whitespace-nowrap opacity-60"
                >
                    <Calendar size={12} />
                    <span>
                        {new Date(task.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })} - {new Date(task.createdAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </motion.div>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
                <div className="flex items-center justify-between">
                    <motion.span
                        layout="position"
                        className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${getStatusStyle(task.status)}`}
                    >
                        {getStatusIcon(task.status)}
                        {task.status}
                    </motion.span>

                    <div className="flex gap-2">
                        {task.status === 'Bekliyor' && !isClaiming && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsClaiming(true)}
                                className="text-[10px] uppercase font-bold text-gray-400 hover:text-green-400 transition-colors bg-white/5 px-2 py-1 rounded"
                            >
                                Görevi Üstlen
                            </motion.button>
                        )}
                        {task.status === 'Aktif' && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onStatusUpdate(task.id, 'Tamamlandı')}
                                className="text-[10px] uppercase font-bold text-gray-400 hover:text-blue-400 transition-colors bg-white/5 px-2 py-1 rounded"
                            >
                                Tamamla
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Claiming Input Field */}
                <AnimatePresence>
                    {isClaiming && (
                        <motion.form
                            initial={{ height: 0, opacity: 0, y: 10 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onSubmit={handleClaimSubmit}
                            className="overflow-hidden"
                        >
                            <input
                                autoFocus
                                type="text"
                                value={claimName}
                                onChange={(e) => setClaimName(e.target.value.replace(/[^a-zA-ZçğışöüÇĞİŞÖÜ\s]/g, ""))}
                                placeholder="İsmini gir ve Enter'la"
                                className="w-full bg-white/5 border border-green-500/30 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-green-500/60 transition-colors"
                            />
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TaskCard;
