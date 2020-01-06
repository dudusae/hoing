import React from 'react';
import './../style.css';

const DeleteBtn = (props) => {
  const handleRemove = e => {
    const { from, id, onRemove } = props;
    onRemove(from, id);
  };

    return (
      <button className="delete__btn" onClick={handleRemove}>
        삭제
      </button>
    );
}

export default DeleteBtn;
