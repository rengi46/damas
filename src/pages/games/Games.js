
import React from 'react';
import { Topos } from '../Topos/Topos';
import Damas from '../Damas/Damas';

const Games = ({ gameType }) => {
  console.log(gameType);
  switch (gameType) {
    case 'topos':
      return <Topos />;
    case 'damas':
      return <Damas />;
    default:
      return <div>No game selected</div>;
  }
};

export default Games;
