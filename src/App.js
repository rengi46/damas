import { useContext, useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Damas from './pages/Damas/Damas';
import SelectorGame from './pages/SelectorGame/SelectorGame';
import { Topos } from './pages/Topos/Topos';
import Tetris from './components/Tetris/Tetris';
import Qrgame from './components/QR/Qrgame';
import Games from './pages/games/Games';
import { GeneralContext } from './context/GeneralContext';



function App() {
  const [juegos, setJuegos] = useState([]);
  const value = useContext(GeneralContext);
  useEffect(() => {
    setJuegos(value);
  }, [value]);
  if(juegos.length === 0) return (<div>Loading...</div>)
  console.log(juegos[0]);
  return (
      <Routes>
        {juegos.length > 1? <Route path="/"  element={<SelectorGame games={juegos}/>} />:<Route path="/"  element={<Games gameType={juegos[0]?.attributes?.Juego}/>}/> }
        {
          juegos && juegos.map((juego, index) => {
            return <Route key={index} path={`/${juego.attributes.Juego}`} element={<Games gameType={juego.attributes.Juego}/>}/>
          })
        }
        <Route path="/qr/:game/:points"  element={<Qrgame value={`https://mobilfront-e2dc3.web.app/register/`}/>} /> 

        <Route path="*"  element={<h1>Not Found</h1>} />
      </Routes>
  );
}

export default App;
