export const tablero = [
  [{p:"1-a",t:"",k:false}, {p:"1-b",t:"",k:false}, {p:"1-c",t:"",k:false}, {p:"1-d",t:"",k:false}, {p:"1-e",t:"",k:false}, {p:"1-f",t:"",k:false}, {p:"1-g",t:"",k:false}, {p:"1-h",t:"",k:false}],
  [{p:"2-a",t:"",k:false}, {p:"2-b",t:"",k:false}, {p:"2-c",t:"",k:false}, {p:"2-d",t:"",k:false}, {p:"2-e",t:"",k:false}, {p:"2-f",t:"",k:false}, {p:"2-g",t:"",k:false}, {p:"2-h",t:"",k:false}],
  [{p:"3-a",t:"",k:false}, {p:"3-b",t:"",k:false}, {p:"3-c",t:"",k:false}, {p:"3-d",t:"",k:false}, {p:"3-e",t:"",k:false}, {p:"3-f",t:"",k:false}, {p:"3-g",t:"",k:false}, {p:"3-h",t:"",k:false}],
  [{p:"4-a",t:"",k:false}, {p:"4-b",t:"",k:false}, {p:"4-c",t:"",k:false}, {p:"4-d",t:"",k:false}, {p:"4-e",t:"",k:false}, {p:"4-f",t:"",k:false}, {p:"4-g",t:"",k:false}, {p:"4-h",t:"",k:false}],
  [{p:"5-a",t:"",k:false}, {p:"5-b",t:"",k:false}, {p:"5-c",t:"",k:false}, {p:"5-d",t:"",k:false}, {p:"5-e",t:"",k:false}, {p:"5-f",t:"",k:false}, {p:"5-g",t:"",k:false}, {p:"5-h",t:"",k:false}],
  [{p:"6-a",t:"",k:false}, {p:"6-b",t:"",k:false}, {p:"6-c",t:"",k:false}, {p:"6-d",t:"",k:false}, {p:"6-e",t:"",k:false}, {p:"6-f",t:"",k:false}, {p:"6-g",t:"",k:false}, {p:"6-h",t:"",k:false}],
  [{p:"7-a",t:"",k:false}, {p:"7-b",t:"",k:false}, {p:"7-c",t:"",k:false}, {p:"7-d",t:"",k:false}, {p:"7-e",t:"",k:false}, {p:"7-f",t:"",k:false}, {p:"7-g",t:"",k:false}, {p:"7-h",t:"",k:false}],
  [{p:"8-a",t:"",k:false}, {p:"8-b",t:"",k:false}, {p:"8-c",t:"",k:false}, {p:"8-d",t:"",k:false}, {p:"8-e",t:"",k:false}, {p:"8-f",t:"",k:false}, {p:"8-g",t:"",k:false}, {p:"8-h",t:"",k:false}]
]

export function printMovs(board,posibleMovs,myPosition){
  const atacks = []
  posibleMovs.forEach((mov) => {
    const position = findPosition(board,mov)
    const points = findPosition(board,myPosition)
    //ver si la posicion existe
    if(position !== null){
      //puedo moverme
      if(board[position[0]][position[1]].t === ""){
        document.querySelector(`[data-point="${mov}"]`).classList.add("mov")
      }
      //puedo comer
      else if(board[position[0]][position[1]].t !== ""){
        //ver si la pieza es del mismo color
        if(board[position[0]][position[1]].t !== board[points[0]][points[1]].t){
          const [f,c] = numPosition(mov)
          const [fila,columna] = numPosition(myPosition)
          const errorMoveFile =  f - fila
          const errorMoveColum =  c - columna 
          const atackMov = f + errorMoveFile + "-" + String.fromCharCode(c + errorMoveColum)
          const atackPosition = findPosition(board,atackMov)  
          if(atackPosition !== null){
            if(board[atackPosition[0]][atackPosition[1]].t === ""){
              document.querySelector(`[data-point="${atackMov}"]`).classList.add("mov")
              document.querySelector(`[data-point="${atackMov}"]`).classList.add("atack")
              atacks.push({mov:atackMov,atack:board[position[0]][position[1]].p})
            }
          }
        }
      }
    }
  })
  return atacks
}



export function numPosition(position){
  const positions = position.split("-")
  let fila = parseInt(positions[0])
  let columna = positions[1].charCodeAt(0);
  return [fila,columna]
}



export function findPosition(board, coords) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].p === coords) {
        return [i, j];
      }
    }
  }
  return null; // Si no se encuentra la posición, se devuelve null
}



export function rellenarTablero(board){
  return board.map((fila, i) => {
    if(i<3){
      return fila.map((casilla, j) => {
        //colocar fichan en las casillas pares
        if(j%2 === 0){
          if(i===1){  //colocar fichan en las casillas inpares
            board[i][j].t = "white"
            board[i][j].k = false
            return board[i][j]
          }
          board[i][j+1].t = "white"
          board[i][j].k = false
          return board[i][j]
        }
        else{
          return board[i][j]
        }
      })
    }
    if(i>4){
      return fila.map((casilla, j) => {
        if(j%2 === 0){
          if(i===6){
            board[i][j+1].t = "black"
            board[i][j].k = false
            return board[i][j]
          }
          board[i][j].t = "black"
          board[i][j].k = false
          return board[i][j]
        }
        else{
          return board[i][j]
        }
      })
    }
    else return fila
  })
}
