import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Shield, Server, Box, LayoutGrid, List } from 'lucide-react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Hepsi');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [isFormVisible, setIsFormVisible] = useState(false);

  const API_URL = 'http://localhost:5000/api/tasks';

  // Fetch tasks from Backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Fetch hatası:", error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      setTasks([newTask, ...tasks]);
    } catch (error) {
      console.error("Ekleme hatası:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error("Silme hatası:", error);
    }
  };

  const updateTaskStatus = async (id, status, assignee = null) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignee }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'Hepsi' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="stars" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-[0%] right-[0%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full animate-pulse" />

      {/* Header Section */}
      <header className="px-6 py-12 flex flex-col items-center justify-center relative z-10">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-4 mb-3"
        >
          <div className="p-3 bg-purple-600/20 rounded-2xl border border-purple-500/30 neon-border-purple animate-float">
            <Rocket className="text-purple-400" size={32} />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
            UZAY GÖREV MERKEZİ
          </h1>
        </motion.div>
        <p className="text-gray-400 font-medium text-lg max-w-md text-center opacity-80">
          Uzay boşluğunda görevlerini yönet, kontrolü eline al.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 relative z-10">
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsFormVisible={setIsFormVisible}
          isFormVisible={isFormVisible}
        />

        <TaskForm
          onAdd={addTask}
          isVisible={isFormVisible}
          setIsVisible={setIsFormVisible}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white/90">Görevlerim</h2>
              <span className="bg-purple-600/20 text-purple-400 text-xs px-2.5 py-0.5 rounded-full border border-purple-600/30">
                {filteredTasks.length}
              </span>
            </div>

            <div className="flex items-center bg-black/30 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'text-purple-400 bg-purple-500/10' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            viewMode={viewMode}
            onDelete={deleteTask}
            onStatusUpdate={updateTaskStatus}
          />
        </div>
      </main>

      {/* Footer / Decorative */}
      <footer className="mt-20 border-t border-white/5 pt-10 px-6 max-w-6xl mx-auto flex justify-between items-center text-gray-600 text-sm">
        <p>© 2026 Uzay Görev Merkezi | Galaktik Operasyonlar</p>
        <div className="flex gap-4">
          <Shield size={16} />
          <Server size={16} />
          <Box size={16} />
        </div>
      </footer>
    </div>
  );
};

export default App;
