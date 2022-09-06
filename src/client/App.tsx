import './style.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import React from "react";

function App() {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="*" element={<Home />} />
                    <Route path="/" element={<Home/>}/>
                    <Route path="/start" element={<Home/>}/>
                    <Route path="/game" element={<Game/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App;
