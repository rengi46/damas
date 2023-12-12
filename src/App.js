import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Damas from './pages/Damas/Damas';
import SelectorGame from './pages/SelectorGame/SelectorGame';
import { Topos } from './pages/Topos/Topos';
import Tetris from './components/Tetris/Tetris';
import Qrgame from './components/QR/Qrgame';
import Games from './pages/games/Games';



function App() {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const URL = process.env.REACT_APP_URL;


  const [juegos, setJuegos] = useState();

  useEffect(() => {

    async function  fetchGames(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", "Bearer "+TOKEN);
    await fetch(URL+'api/juegos?populate=imageJuego',
      {
        method: 'GET',
        headers: myHeaders
      }).then((response) => {
        return response.json();
      }).then((data) => {
        const juegosActivos = data.data.filter((juego) => juego.attributes.Activo === true);
        console.log(juegosActivos);
        setJuegos(juegosActivos);
      }).catch((error) => {
        console.log(error);
      }
      );
    }
    fetchGames();
  }, []);

  return (
    <Routes>
      {juegos && <Route path="/"  element={<SelectorGame games={juegos}/>} /> }
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
