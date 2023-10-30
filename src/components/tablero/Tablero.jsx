import React, { useEffect } from 'react'
import './tablero.css'
import rules from '../../assets/data/chess.json'
import ChessPiece from '../ChessPiece/ChessPiece'
import { findPosition, numPosition, printMovs, rellenarTablero, tablero } from './functions'

export const Tablero = ({deletePice,reset}) => {
  const colorTurn = document.querySelector(".turnColor")

  // use states
  const [board, setBoard] = React.useState(tablero);// Estado del Tablero
  const [useEffectActive, setUseEffectActive] = React.useState(false);//renderizar el tablero
  const [selectedPiece, setSelectedPiece] = React.useState(null); // Posición de la pieza seleccionada
  const [atacks, setAtacks] = React.useState([]); // posibles atakes de la pieza seleccionada
  const [turn, setTurn] = React.useState("white"); // turno de juego [white,black]


  //use effect para rellenar el tablero
  useEffect(() => {
    setBoard(rellenarTablero(board))
  }, [reset]) // Se ejecuta solo al montar el componente


  //use effect para actualizar el tablero
  useEffect(() => {
    if (useEffectActive) {
      setUseEffectActive(false); // Restablece useEffectActive a false
    }
  }
  , [useEffectActive])


  function moverPiza(e){
    //ver si se puede mover la pieza
    if(e.target.classList.contains("mov")){
      let combo = []
      //posicion donde se va a mover la pieza
      const points = findPosition(board,e.target.dataset.point)
      //posicion pieza seleccionada
      const points2 = findPosition(board,selectedPiece.p)
      //mover la pieza
      board[points[0]][points[1]].t = selectedPiece.t
      board[points[0]][points[1]].k = selectedPiece.k
      board[points2[0]][points2[1]].t = ""
      board[points2[0]][points2[1]].k = false

      //ver si se puede comer la pieza
      if(e.target.classList.contains("atack")){
        //posicion de la pieza a comer
        const deadPice = atacks.find((atack) => atack.mov === e.target.dataset.point)
        const points3 = findPosition(board,deadPice.atack)
        //comer la pieza
        deletePice(board[points3[0]][points3[1]].t)
        board[points3[0]][points3[1]].t = ""
        board[points3[0]][points3[1]].k = false
        //ver si se puede hacer combo
        combo = verMovimientos(board[points[0]][points[1]].p)
      }
      //si la pieza llega al final se convierte en reina
      if(rules.toKing[board[points[0]][points[1]].t] === points[0]){
        board[points[0]][points[1]].k = true
      }
      //limpiar movimientos
      if(!e.target.classList.contains("chess-piece")){
      setSelectedPiece(null)
      document.querySelectorAll(".mov").forEach((mov) => {
          mov.classList.remove("mov")
          mov.classList.remove("atack")
        })
      }
      //cambiar de turno si no hace combo
      if(combo.length > 0){
        verMovimientos(board[points[0]][points[1]].p)
      }
      else{
        setTurn(turn === "white"?"black":"white")
        colorTurn.classList.toggle("black_turn")
      }

      setBoard(board)
      setUseEffectActive(true); // Activa el useEffect
    }
  }


  function verMovimientos(position){
    //limpiar movimientos
    document.querySelectorAll(".mov").forEach((mov) => {
      mov.classList.remove("mov")
      mov.classList.remove("atack")
    })
    setAtacks([])
    console.log(position);
    //separar posicion en fila y columna y pasarlo a numero
    const points = findPosition(board,position)
    if(board[points[0]][points[1]].t !== turn) return
    
    let [fila,columna] = numPosition(position)

    //obtener movimientos posibles
    const posibleMovs = rules.movs[board[points[0]][points[1]].k === false?board[points[0]][points[1]].t:"dama"].map((movimiento) => {
      //separar  movimiento en filas y columnas
      const p_mov = movimiento.split("_")
      //obtener fila y columna del movimiento
      let fila_mov = Number(p_mov[0]) + fila
      let columna_mov = Number(p_mov[1]) + columna
      return(`${fila_mov}-${String.fromCharCode(columna_mov)}`);
    })

    const posibleAtack = printMovs(board,posibleMovs,position)

    setSelectedPiece(board[points[0]][points[1]])
    setAtacks(posibleAtack)
    setBoard(board)
    setUseEffectActive(true); // Activa el useEffect
    return posibleAtack
  }



  return (
    <div className='tablero'>
      {
        board.map((fila, i) => {
          return (
            <div className="fila" key={i} data-point={i+1}>
              {
                fila.map((casilla, j) => {
                  let letraCasilla = casilla.p.split("-")[1]
                  return (
                    <div className="casilla" key={letraCasilla} data-point={casilla.p} onClick={(e) => moverPiza(e)}>
                      {
                        casilla.t !== "" ? 
                        <ChessPiece position={casilla.p} type={casilla.t} handelMove={verMovimientos} k={casilla.k}/> : null
                        // <div className="casilla-vacia" ></div>
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}
