// components/Button.js
import React from 'react';

const Button = ({ text, onClick, style, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} style={style} className="custom-button">
      {text}
    </button>
  );
};

export default Button;
