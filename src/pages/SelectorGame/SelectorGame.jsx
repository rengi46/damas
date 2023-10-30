import React from 'react'
import './selectorGame.css'

const SelectorGame = () => {
  const [game, setGame] = React.useState('topos')
  const descriptions = {
    topos: 'Juego en el que tienes que matar la mayor cantidad de topos en 60 segundos',
    damas: 'Juego de damas para dos jugadores'
  }

  document.addEventListener("keypress", (e) => {
    console.log(e.key);
  
    if (e.key === 'Enter') {
      if (game === 'topos') {
        window.location.href = '/topos'
      } else if (game === 'damas') {
        window.location.href = '/damas'
      }
    }

    if (e.key === 'w' || e.key === 's') {
      console.log('cambio de juego');
      if (game === 'topos') {
        setGame('damas')
      } else if (game === 'damas') {
        setGame('topos')
      } else {
        setGame('topos')
      }
    }
    })
  return (
    <div className='selector'>
      <div className='interiorTV'>
        <h1>SelectorGame</h1>
        <div className='contentTv'>

          <ul >
            <li className={game === 'topos' ? "selectedLi" :""} ><a href="/topos">Topos</a></li>
            <li  className={game === 'damas' ? "selectedLi" :""} ><a href="/damas">Damas</a></li>
          </ul>
          <div className='infoGame'>
            <div className={'imgJuego '+game+"-game"}/>
            <div className='infoGameText'>
              <p>{descriptions[game]}</p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectorGame