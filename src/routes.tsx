import React from 'react';
import Home from './pages/Home';
import {Navigate, Route, Routes} from 'react-router-dom'
import Game from "./pages/Game";

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/start" replace />}/>
                <Route path="/start" element={<Home />} />
                <Route path="/game" element={<Game />} />
            </Routes>
        </>
    );
}

export default Routers;
