import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Damas from './pages/Damas/Damas';
import SelectorGame from './pages/SelectorGame/SelectorGame';
import { Topos } from './pages/Topos/Topos';



function App() {

  return (
    <Routes>
      <Route path="/"  element={<SelectorGame/>} /> 
      <Route path="/damas"  element={<Damas/>} /> 
      <Route path="/topos"  element={<Topos/>} /> 
    </Routes>

  );
}

export default App;
