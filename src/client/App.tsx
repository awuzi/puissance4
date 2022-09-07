import '../../public/assets/style.css'
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
                    <Route path="/game.html" element={<Game/>}/>
                    <Route path="/game/:gameId" element={<Home/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App;
