import React, { useEffect } from 'react'
import './selectorGame.css'

const SelectorGame = ({games}) => {
    const [game, setGame] = React.useState(games[0])






    useEffect(() => {
      const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
          window.location.href = `/${game.attributes.Juego}`
        }
        console.log(game);
        const indexGame = games.indexOf(game)
        if (e.key === 's' && games[indexGame - 1] !== undefined) {
          setGame(games[indexGame - 1]);
        }
        if (e.key === 'w' && games[indexGame + 1] !== undefined) {
          setGame(games[indexGame + 1]);
        }
      };
  
      document.addEventListener('keypress', handleKeyDown);
  
      return () => {
        document.removeEventListener('keypress', handleKeyDown);
      };
    }, [game, games]);
  return (
    <div className='selector'>
      <div className='interiorTV'>
        <h1>SelectorGame</h1>
        <div className='contentTv'>

          <ul >
            {
              games.map((gameData, i) => {
                return (
                  <li key={i} className={game.attributes.Juego === gameData.attributes.Juego ? "selectedLi" :""} ><a href={`/${gameData.attributes.Juego}`}>{gameData.attributes.Juego}</a></li>
                )
              })
            }
          </ul>
          <div className='infoGame'>
            {game.attributes?.imageJuego !== undefined &&  <img src={` http://localhost:1337${game.attributes?.imageJuego?.data?.attributes?.formats.small.url}`} alt=""/> }
            <div className={'imgJuego '+"-game"}/>
            <div className='infoGameText'>
              {/* <p>{game}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectorGame