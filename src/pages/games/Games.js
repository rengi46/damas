
import React from 'react';
import { Topos } from '../Topos/Topos';
import Damas from '../Damas/Damas';

const Games = ({ gameType }) => {
  console.log(gameType);
  switch (gameType) {
    case 'Topos':
      return <Topos />;
    case 'Damas':
      return <Damas />;
    default:
      return <div>No game selected</div>;
  }
};

export default Games;
