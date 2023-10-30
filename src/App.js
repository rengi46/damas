import { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Damas from './pages/Damas/Damas';
import SelectorGame from './pages/SelectorGame/SelectorGame';



function App() {

  return (
    <Routes>
      <Route path="/"  element={<SelectorGame/>} /> 
      <Route path="/damas"  element={<Damas/>} /> 
    </Routes>

  );
}

export default App;
