"use client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Room from './pages/[code]';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/:code" element={<Room />} />
            </Routes>
            <Footer />
        </Router>
    );
}