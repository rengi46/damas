import React from 'react'
import './chessPiece.css'

const ChessPiece = ({position,type,handelMove,k}) => {
  function handelClick(){
    handelMove(position)
  }
  const classPice =  k === false? type : type+"-k" 
  return (
    <div className={'chess-piece ' + classPice} onClick={handelClick}>

    </div>
  )
}

export default ChessPiece