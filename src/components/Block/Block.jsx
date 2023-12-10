import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ color }) => {
  const style = {
    backgroundColor: color,
    width: '25px',
    height: '25px',
    border: '1px solid #333',
    boxSizing: 'border-box',
  };

  

  return <div style={style} />;
};

Block.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Block;
