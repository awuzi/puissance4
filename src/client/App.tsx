import '../../public/assets/style.css'
import { Route, Routes } from "react-router-dom";
import { socket, SocketContext } from "./context/socket";
import Home from "./pages/Home";
import Game from "./pages/Game";
import React from "react";

const App = () => {
  return (
    // @ts-ignore
    <SocketContext.Provider value={socket}>
      <div className="App">
        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="game/:gameId" element={<Game/>}/>
        </Routes>
      </div>
    </SocketContext.Provider>
  )
}

export default App;
