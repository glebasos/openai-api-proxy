import React, { FC, MouseEvent } from 'react';
import './Button.css'; // Import your CSS file for styling

interface NiceButtonProps {
  text: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const NiceButton: FC<NiceButtonProps> = ({ text, onClick }) => {
  return (
    <button className="nice-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default NiceButton;