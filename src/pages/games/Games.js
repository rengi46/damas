
import React, { useContext } from 'react';
import { Topos } from '../Topos/Topos';
import Damas from '../Damas/Damas';
import PulpoGame from '../pulpoGame/PulpoGame';
import Header from '../../components/header/Header';
import { GeneralContext } from '../../context/GeneralContext';

const Games = ({ gameType }) => {
  const value = useContext(GeneralContext);
  if(value.length === 0) return (<div>Loading...</div>)
  const actaualGame = value.filter(element => {
    return element.attributes.Juego === gameType;
  });
  return(
    <Game src={actaualGame[0].attributes.url}/>
  )

  // console.log(gameType);
  // switch (gameType) {
  //   case 'Topos':
  //     return <Topos />;
  //   case 'Damas':
  //     return <Damas />;
  //   case 'Pulpos':
  //     return <PulpoGame />;
  //   default:
  //     return <div>No game selected</div>;
  // }
};

export default Games;

export const Game = ({src}) => {
  console.log(src);

  const style = {
    width: '100%',
    height: '100%',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
  return (
    <div style={style}>
      <Header/>
      <iframe title='game' src={src} width="100%" height="70%"></iframe>
    </div>
  )
}
