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
  const URL = process.env.REACT_APP_URL_URL;

  // const url = "https://celebrated-friends-2382d9c517.strapiapp.com/"

  // const toke = "fed5a6a3c56289b7bf9bd27f7f720ee593ae153bfed739bfc5a12a720202c66582833baae082fd5591bda5dc40015f31ce1a13c8e7d40cc0a879cdcd23566337e207d42805bd1d6897c603c1bdc989db7d6d034d5827d40619222969258a9445765db2417af1f8d31b7ac7b8a323a4a33af660f56f372a9d5f7d5f1a463f7501"

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
