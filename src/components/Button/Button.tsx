import React from 'react';
import './Button.css';

type ButtonType = {
  state: 'start' | 'finish' | 'restart';
  handleClick: () => void;
};

export const Button: React.FC<ButtonType> = ({ state, handleClick }) => {
  return (
    <button className='button' onClick={handleClick}>
      {state.toUpperCase()}
    </button>
  );
};
