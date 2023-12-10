import React, { useState, useEffect } from 'react';
import './tetris.css';
import Block from '../Block/Block';


const Tetris = () => {
  const [board, setBoard] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null); // Estado para la pieza actual
  const [piecePosition, setPiecePosition] = useState({ row: 0, col: 0 }); // Posición de la pieza actual
  const [isMoving, setIsMoving] = useState(false); // Estado para saber si la pieza se está moviendo o no



  useEffect(() => {
    // Game loop logic goes here
    const newBoard = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push({ color: 'white', isEmpty: true });
      }
      newBoard.push(row);
    }
    setBoard(newBoard);
        // Inicializar la pieza actual (palo en este caso)
        setCurrentPiece(getRandomPice());
    
        // Colocar la pieza en la parte superior del tablero
        setPiecePosition({ row: 0, col: 3 }); // Ajusta la posición inicial según tus necesidades
  }, []);





  function blockFall(actualBoard,position) {
    const newBoard = [...actualBoard];

    // console.log(board);
    // Mueve la pieza hacia abajo (simplemente incrementa la fila)
    const newPosition = { ...position };
    if (canMoveDown() ) {
      newPosition.row += 1;

          // Elimina la pieza actual de la posición anterior
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[0].length; j++) {
        if (currentPiece[i][j] === 1 && piecePosition.row + currentPiece.length < 20) {
          newBoard[piecePosition.row + i][piecePosition.col + j] = {
            color: 'white',
            isEmpty: true,
          };
        }
      }
    }
  
      // Coloca la pieza en la nueva posición en el tablero
      for (let i = 0; i < currentPiece.length; i++) {
        for (let j = 0; j < currentPiece[0].length; j++) {
          if (currentPiece[i][j] === 1 && newPosition.row + currentPiece.length < 21) {
            newBoard[newPosition.row + i][newPosition.col + j] = {
              color: 'red',
              isEmpty: false,
            };
          }
     
        }
      }
      if(newPosition.row + currentPiece.length < 20){
        // Actualiza la posición de la pieza actual en el estado
        setPiecePosition(newPosition);
    
        // Actualiza el tablero
        setBoard(newBoard);
      }
      else if(newPosition.row + currentPiece.length >= 20){
        solidifyPiece(newPosition);
        
      }
    }
    else if(!canMoveDown()) {
      solidifyPiece(newPosition);
    }
  }

  function canMoveDown() {
    // Verifica si la pieza actual puede moverse hacia abajo
    for (let j = 0; j < currentPiece[0].length; j++) {
      if (currentPiece[currentPiece.length - 1][j] === 1) {
        const newRow = piecePosition.row + currentPiece.length;
        const newCol = piecePosition.col + j;
  
        // Verifica si la nueva posición está dentro de los límites del tablero y si la celda está vacía
        if (newRow >= 0 && newRow < 20 && newCol >= 0 && newCol < 10 && board[newRow][newCol].isEmpty) {
          continue; // El bloque puede moverse hacia abajo
        } else {
          return false; // No se puede mover hacia abajo
        }
      }
    }
  
    return true; // Todos los bloques de la última fila pueden moverse hacia abajo
  }

  function solidifyPiece(position) {
    const newBoard = [...board];

    // Recorre la pieza actual y actualiza el tablero con su color y marca como no vacía
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[0].length; j++) {
        if (currentPiece[i][j] === 1  && piecePosition.row+1 + currentPiece.length < 21) {
          console.log(piecePosition.row+1 + currentPiece.length);
          // if(newBoard[piecePosition.row + i][piecePosition.col + j].color === "red"){
            if(piecePosition.row+1  + currentPiece.length === 20){
              console.log("entro");
              newBoard[piecePosition.row+1+ i][piecePosition.col + j] = {
                color: 'green',
                isEmpty: false,
              };
            }
            else{
              newBoard[piecePosition.row+ i][piecePosition.col + j] = {
                color: 'green',
                isEmpty: false,
              };
            // }
        }
        }
      }
    }

    setBoard(checkForCompleteRows());
        // Inicializar la pieza actual (palo en este caso)
        setCurrentPiece(getRandomPice());
    
        // Colocar la pieza en la parte superior del tablero
        setPiecePosition({ row: 0, col: 3 }); // Ajusta la posición inicial según tus necesidades

  }

  function rotateArrayClockwise(arr) {
    const n = arr.length;
    const m = arr[0].length;
    const rotated = new Array(m).fill().map(() => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        rotated[j][n - i - 1] = arr[i][j];
      }
    }
    return rotated;
  }
  
  function rotatePiece() {
    if (isMoving) return; // Evitar la rotación si la pieza está en movimiento

    const newBoard = [...board];
    const pieceSizeRow = currentPiece.length;
    const pieceSizeCol = currentPiece[0].length;
    let  newPiece = [];

    newPiece=rotateArrayClockwise(currentPiece);
  
    // Verifica si la nueva pieza rotada colisionará con otras piezas o el límite del tablero
    // for (let i = 0; i < pieceSizeRow; i++) {
    //   for (let j = 0; j < pieceSizeCol; j++) {
    //     if (newPiece[i][j] === 1) {
    //       const newRow = piecePosition.row + i;
    //       const newCol = piecePosition.col + j;
  
    //       if (
    //         newRow < 0 ||
    //         newRow >= 20 ||
    //         newCol < 0 ||
    //         newCol >= 10 ||
    //         !board[newRow][newCol].isEmpty
    //       ) {
    //         return; // No se puede rotar debido a una colisión
    //       }
    //     }
    //   }
    // }
  
    // Elimina la pieza actual de la posición anterior
    for (let i = 0; i < pieceSizeRow; i++) {
      for (let j = 0; j < pieceSizeCol; j++) {
        if (currentPiece[i][j] === 1) {
          newBoard[piecePosition.row + i][piecePosition.col + j] = {
            color: 'white',
            isEmpty: true,
          };
        }
      }
    }
  
    // Actualiza la pieza actual y la posición con la nueva pieza rotada
    setCurrentPiece(newPiece);
  
    // Coloca la nueva pieza en la posición actual
    for (let i = 0; i < newPiece.length; i++) {
      for (let j = 0; j < newPiece[0].length; j++) {
        if (newPiece[i][j] === 1) {
          newBoard[piecePosition.row + i][piecePosition.col + j] = {
            color: 'red',
            isEmpty: false,
          };
        }
      }
    }
  
    // Actualiza el tablero
    setBoard(newBoard);
    setIsMoving(false);
  }

  function checkForCompleteRows() {
    let newBoard = [...board];
    board.forEach((row, rowIndex) => {
      let isComplete = true;
      row.forEach((block) => {
        if (block.isEmpty) {
          isComplete = false;
        }
      });
  
      if (isComplete) {
        newBoard =  clearRow(rowIndex);
      }
    }
    );
    return newBoard;
  }

  function clearRow(rowIndexComplete) {
    const newBoard = board.map((row, rowIndex) => {
      if (rowIndex === 0) {
        return row.map((block, blockIndex) => {
          return { color: 'white', isEmpty: true };
        });
      }
       else if (rowIndex <= rowIndexComplete) {
        return board[rowIndex - 1];
      }
      else {
        return row;
      }
    }
    );
    return newBoard
  }

  useEffect(() => {
    if(isMoving) return
    const interval = setInterval(() => {
      blockFall(board,piecePosition);
    }, 200);
    return () => clearInterval(interval);
  }, [blockFall,isMoving,board,piecePosition]);

  function handleKeyPress(event) {
    
    // console.log(isMoving,"handleKeyPress");
    if (event.keyCode === 37) {
      setIsMoving(true);
      moveBlockLeft();
    }
    if (event.keyCode === 39) {
      setIsMoving(true);
      moveBlockRight();
    }
    if (event.keyCode === 38) {
      rotatePiece();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }
  );

  function moveBlockLeft() {
    const newBoard = [...board];
    console.log(canMoveLeft());
  if (!canMoveLeft() ) {
    setIsMoving(false);
    return;
  }

    // Elimina la pieza actual de la posición anterior
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[0].length; j++) {
        if (currentPiece[i][j] === 1) {
          newBoard[piecePosition.row + i][piecePosition.col + j] = {
            color: 'white',
            isEmpty: true,
          };
        }
      }
    }
  
    // Coloca la pieza en la nueva posición (derecha)
    const newPosition = { ...piecePosition };
    newPosition.col -= 1;
  
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[0].length; j++) {
        if (currentPiece[i][j] === 1) {
          newBoard[newPosition.row + i][newPosition.col + j] = {
            color: 'red',
            isEmpty: false,
          };
        }
      }
    }
  
    // Actualiza la posición de la pieza actual en el estado
    setPiecePosition(newPosition);
  
    // Actualiza el tablero
    setBoard(newBoard);
    setTimeout(() => {

      setIsMoving(false);
    }, 400);
    // isMov = false;
  }

  function canMoveLeft() {
    // Verifica si la pieza actual puede moverse hacia la izquierda
    for (let i = 0; i < currentPiece.length; i++) {
      if (currentPiece[i][0] === 1) {
        const newRow = piecePosition.row + i;
        const newCol = piecePosition.col - 1;

        // Verifica si la nueva posición está dentro de los límites del tablero y si la celda está vacía
        if (newRow >= 0 && newRow < 20 && newCol >= 0 && newCol < 10 && board[newRow][newCol].isEmpty) {
          continue; // El bloque puede moverse hacia abajo
        } else {
          return false; // No se puede mover hacia la izquierda
        }
      }
    }
    return true; // Todos los bloques de la última fila pueden moverse  hacia la izquierda

  }

  function moveBlockRight() {
    const newBoard = [...board];

  
    if (piecePosition.col + currentPiece[0].length >= 10) {
      // setIsMoving(false);
      return;
    };

    
  
    // Elimina la pieza actual de la posición anterior
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[0].length; j++) {
        if (currentPiece[i][j] === 1) {
          newBoard[piecePosition.row + i][piecePosition.col + j] = {
            color: 'white',
            isEmpty: true,
          };
        }
      }
    }
  
    // Coloca la pieza en la nueva posición (derecha)
    const newPosition = { ...piecePosition };
    newPosition.col += 1;
  
    for (let i = 0; i < currentPiece.length; i++) {
      for (let j = 0; j < currentPiece[0].length; j++) {
        if (currentPiece[i][j] === 1) {
          newBoard[newPosition.row + i][newPosition.col + j] = {
            color: 'red',
            isEmpty: false,
          };
        }
      }
    }
  
    // Actualiza la posición de la pieza actual en el estado
    setPiecePosition(newPosition);
  
    // Actualiza el tablero
    setBoard(newBoard);
    setTimeout(() => {
      setIsMoving(false);
    }, 400);
    // isMov = false;
  }
  
  function getRandomPice(){
    const pieces = [
      [
        [1, 1],
        [1, 1],
      ], // Representa un cuadrado
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0], // Representa una línea vertical
      ],
      [
        [0, 1, 0],
        [1, 1, 1], // Representa una L
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0], // Representa una L invertida
      ],
      [
        [0, 1, 0],
        [1, 1, 1], // Representa una T
      ],
      [
        [1, 1, 0],
        [0, 1, 1], // Representa una S
      ],
      [
        [0, 1, 1],
        [1, 1, 0], // Representa una S invertida
      ],
      [
        [1, 1, 1,1] // Representa una Linea
      ],
      [
        [1], 
        [1], 
        [1],
        [1] // Representa una Linea
      ],
    ];
  
    const randomIndex = Math.floor(Math.random() * pieces.length);
    return pieces[randomIndex];
  }




  return (
    <div className="tetris">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((block, blockIndex) => (
            <Block key={blockIndex} color={block.color} isEmpty={block.isEmpty} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Tetris;
