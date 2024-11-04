"use client";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Roompage from './pages/Roompage';
import { Header } from './pages/pagecomponents/Header';
import { Footer } from './pages/pagecomponents/Footer';

export default function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/:code" element={<Roompage />} />
            </Routes>
            <Footer />
        </Router>
    );
}