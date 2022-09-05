import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom'

const Routers = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}

export default Routers;
