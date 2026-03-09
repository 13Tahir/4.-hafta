import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskForm = ({ onAdd, isVisible, setIsVisible }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleAuthorChange = (e) => {
        const value = e.target.value;
        // Sadece harfler (Türkçe karakterler dahil) ve boşluk
        const onlyLetters = value.replace(/[^a-zA-ZçğışöüÇĞİŞÖÜ\s]/g, "");
        setAuthor(onlyLetters);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !author.trim() || !dueDate || !description.trim()) return;
        onAdd({
            id: Date.now(),
            title,
            description,
            author,
            dueDate,
            status: 'Bekliyor',
            createdAt: new Date().toISOString(),
        });
        setTitle('');
        setDescription('');
        setAuthor('');
        setDueDate('');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="w-full glass-card p-6 mb-8 relative z-20"
                >
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
                        Yeni Görev Oluştur
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-1">Görev Adı</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Örn: Elmas madeni inşası..."
                                required
                                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-purple-500/20 focus:border-purple-500/60 focus:outline-none transition-colors"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-1">Ekleyen Kişi</label>
                                <input
                                    type="text"
                                    value={author}
                                    onChange={handleAuthorChange}
                                    placeholder="İsminiz (Sadece harf)"
                                    required
                                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-purple-500/20 focus:border-purple-500/60 focus:outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-400 mb-1">Bitiş Tarihi</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 rounded-xl bg-black/40 border border-purple-500/20 focus:border-purple-500/60 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-400 mb-1">Açıklama</label>
                            <textarea
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Görevle ilgili detayları buraya yaz..."
                                required
                                className="w-full px-4 py-2 rounded-xl bg-black/40 border border-purple-500/20 focus:border-purple-500/60 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 neon-border-purple shadow-lg"
                        >
                            <Plus size={20} />
                            Görevi Kaydet
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TaskForm;
