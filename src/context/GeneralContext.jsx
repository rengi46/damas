import React, { useEffect } from 'react';

export const GeneralContext = React.createContext();

export default function GeneralContextProvider({children}) {
  const TOKEN = process.env.REACT_APP_TOKEN;
  const URL = process.env.REACT_APP_URL;
  // const URL = "https://localhost:1337/";
  const [games, setGames] = React.useState([]);
  async function  fetchGames(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer "+TOKEN);
    console.log(URL+'api/juegos?populate=imageJuego');
  await fetch(URL+'api/juegos?populate=imageJuego',
    {
      method: 'GET',
      headers: myHeaders
    }).then((response) => {
      return response.json();
    }).then((data) => {
      const juegosActivos = data.data.filter((juego) => juego.attributes.Activo === true);
      console.log(juegosActivos);
      setGames(juegosActivos);
    }).catch((error) => {
      console.log(error);
    }
    );
  }
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <GeneralContext.Provider value={games}>
      {children}
    </GeneralContext.Provider>
  )
}