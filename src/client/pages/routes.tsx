import React from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom'
import Game from "./Game";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/start" element={<Home/>}/>
        <Route path="/game/:gameId" element={<Game/>}/>
      </Routes>
    </>
  );
}

export default Routers;