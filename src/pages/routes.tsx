import React from 'react';
import GameHome from './GameHome';
import { Route, Routes } from 'react-router-dom'

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<GameHome />} />
            </Routes>
        </>
    );
}

export default Routers;
