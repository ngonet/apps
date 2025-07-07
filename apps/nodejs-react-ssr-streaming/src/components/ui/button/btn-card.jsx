import React from 'react';

export const BtnCard = ({ onClick, label }) => {
  return (
    <button type="button" className="btn btn-outline-theme btn-sm" onClick={onClick}>
      {label}
    </button>
  );
};
