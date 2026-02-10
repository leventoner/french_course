import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useAuthStore } from './stores/authStore';

// Pages
import DashboardPage from './pages/DashboardPage';
import LessonsPage from './pages/LessonsPage';
import WordsPage from './pages/WordsPage';
import GrammarPage from './pages/GrammarPage';
import GamesPage from './pages/GamesPage';
import ProgressPage from './pages/ProgressPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminWordsPage from './pages/admin/AdminWordsPage';
import AdminLessonsPage from './pages/admin/AdminLessonsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AIGeneratorPage from './pages/admin/AIGeneratorPage';

const App = () => {
    const { token, user, fetchMe } = useAuthStore();

    useEffect(() => {
        if (token) {
            fetchMe();
        }
    }, [token, fetchMe]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={!token ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/" />} />

                {/* Protected Routes Wrapper */}
                <Route path="/" element={token ? <Layout><DashboardPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={token ? <Layout><DashboardPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/lessons" element={token ? <Layout><LessonsPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/words" element={token ? <Layout><WordsPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/grammar" element={token ? <Layout><GrammarPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/games" element={token ? <Layout><GamesPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/progress" element={token ? <Layout><ProgressPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/search" element={token ? <Layout><SearchPage /></Layout> : <Navigate to="/login" />} />
                <Route path="/admin" element={token && user?.is_admin ? <Layout><AdminDashboard /></Layout> : <Navigate to="/" />} />
                <Route path="/admin/words" element={token && user?.is_admin ? <Layout><AdminWordsPage /></Layout> : <Navigate to="/" />} />
                <Route path="/admin/lessons" element={token && user?.is_admin ? <Layout><AdminLessonsPage /></Layout> : <Navigate to="/" />} />
                <Route path="/admin/users" element={token && user?.is_admin ? <Layout><AdminUsersPage /></Layout> : <Navigate to="/" />} />
                <Route path="/admin/settings" element={token && user?.is_admin ? <Layout><AdminSettingsPage /></Layout> : <Navigate to="/" />} />
                <Route path="/admin/generate" element={token && user?.is_admin ? <Layout><AIGeneratorPage /></Layout> : <Navigate to="/" />} />

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
