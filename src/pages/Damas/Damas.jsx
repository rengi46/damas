import React, { useState } from 'react'
import { Tablero } from '../../components/tablero/Tablero';
import './damas.css'
import Header from '../../components/header/Header';

const Damas = () => {
  const [white, serWhite] = useState(12);
  const [black, serBlack] = useState(12);
  const [reset, setReset] = useState(false);
  const deletePice = (color) => {
    if (color === 'white') {
      if(white === 1){
        document.querySelector('.modalWin').style.visibility = 'visible'
      }
      serWhite(white - 1);
    } else {
      if(white === 1){
        document.querySelector('.modalWin').style.visibility = 'visible'
      }
      serBlack(black - 1);
    }
  }
  return (
    <div className='damas_panel'>      
      <Header />
      <h1>Damas</h1>
      <div className='stats_tablero'>
        <div><div>fichas blancas</div><div>{white}</div></div>
        <div><div>turno de</div><div className='turnColor' id="turnColor"></div></div>
        <div><div>fichas Rojas</div><div>{black}</div></div>
      </div>
      <Tablero deletePice={deletePice} reset={reset}/>
      <div className='modalWin'>{white=== 1 ? "white":"red"} win!<button onClick={()=>{
        setReset(true)
        document.querySelector('.modalWin').style.visibility = 'hidden'
        }} >reset</button></div>
   </div>
  )
}

export default Damas