import React, { useEffect } from 'react';
import { useLevelStore } from '../stores/levelStore';
import { useLessonStore } from '../stores/lessonStore';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle, Clock, Award } from 'lucide-react';

const LessonsPage: React.FC = () => {
    const { levels, fetchLevels } = useLevelStore();
    const { lessons, fetchLessons, loading } = useLessonStore();

    useEffect(() => {
        fetchLevels();
        fetchLessons();
    }, [fetchLevels, fetchLessons]);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Dersler</h1>
                <p className="text-gray-400">Fransızca yolculuğunda ilerlemek için dersleri tamamla.</p>
            </header>

            {levels.map((level) => (
                <section key={level.id} className="space-y-4">
                    <div className="flex items-center space-x-4 border-l-4 border-blue-500 pl-4 py-2">
                        <h2 className="text-2xl font-semibold text-white">{level.title_tr} ({level.title_fr})</h2>
                        <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                            Seviye {level.level_number}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons
                            .filter((lesson) => lesson.level_id === level.id)
                            .map((lesson, index) => (
                                <motion.div
                                    key={lesson.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 p-6 rounded-2xl hover:border-blue-500/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                                            <BookOpen className="text-blue-400" size={24} />
                                        </div>
                                        <span className="flex items-center text-xs font-medium text-gray-400 bg-gray-900/50 px-2 py-1 rounded-lg">
                                            <Clock size={14} className="mr-1" />
                                            10 dk
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-1">{lesson.title_tr}</h3>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{lesson.content}</p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center text-yellow-500 text-sm font-medium">
                                            <Award size={16} className="mr-1" />
                                            +{lesson.xp_reward} XP
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-lg shadow-blue-900/20">
                                            Başla
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </section>
            ))}

            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
};

export default LessonsPage;
