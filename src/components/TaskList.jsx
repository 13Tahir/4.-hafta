import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const TaskList = ({ tasks, onDelete, onStatusUpdate, viewMode }) => {
    if (tasks.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center p-10 glass-card"
            >
                <div className="w-16 h-16 rounded-full bg-gray-500/10 flex items-center justify-center mb-4 text-gray-400">
                    ?
                </div>
                <p className="text-gray-400">Şu an hiç görev yok. Yeni bir tane ekleyebilirsin.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={`grid gap-6 auto-rows-fr ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
        >
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onStatusUpdate={onStatusUpdate}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
};

export default TaskList;
