import React, { useState } from 'react'
import { Tablero } from '../../components/tablero/Tablero';

const Damas = () => {
  const [white, serWhite] = useState(12);
  const [black, serBlack] = useState(12);
  const deletePice = (color) => {
    console.log(color);
    if (color === 'white') {
      serWhite(white - 1);
    } else {
      serBlack(black - 1);
    }
  }
  return (
    <div className='damas'>      
      <h1>Damas</h1>
      <div className='stats_tablero'>
        <div><div>fichas blancas</div><div>{white}</div></div>
        <div><div>turno de</div><div className='turnColor' id="turnColor"></div></div>
        <div><div>fichas negras</div><div>{black}</div></div>
      </div>
      <Tablero deletePice={deletePice}/>
   </div>
  )
}

export default Damas