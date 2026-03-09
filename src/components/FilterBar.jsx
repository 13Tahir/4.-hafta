import React from 'react';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterBar = ({
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    setIsFormVisible,
    isFormVisible
}) => {
    const filters = ['Hepsi', 'Bekliyor', 'Aktif', 'Tamamlandı'];

    return (
        <div className="flex flex-col md:flex-row items-center gap-6 mb-12 relative z-10 glass-card p-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Görevlerde ara..."
                    className="w-full bg-black/40 border border-purple-500/20 px-10 py-2.5 rounded-xl focus:outline-none focus:border-purple-500/60 transition-colors"
                />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-purple-500/10 relative">
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`relative px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-300 z-10 ${filter === f ? 'text-purple-300' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                        {filter === f && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-purple-600/30 border border-purple-600/40 rounded-lg -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                            />
                        )}
                        {f}
                    </button>
                ))}
            </div>

            {/* Action Button */}
            {!isFormVisible && (
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-bold text-white shadow-lg hover:rotate-1 transition-transform flex items-center gap-2 group"
                >
                    <div className="p-1 rounded bg-white/20 group-hover:bg-white/40 transition-colors">
                        <Plus size={16} />
                    </div>
                    <span>Yeni Görev</span>
                </button>
            )}
        </div>
    );
};

export default FilterBar;
