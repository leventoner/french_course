import React from 'react';
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

const App = () => {
    const token = useAuthStore((state) => state.token);

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

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
