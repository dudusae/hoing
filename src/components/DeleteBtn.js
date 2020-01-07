import React from 'react';
import './../style.css';

const DeleteBtn = (props) => {
  const handleRemove = e => {
    const { id, from, onRemove } = props;
    onRemove(id, from);
  };

    return (
      <button className="delete__btn" onClick={handleRemove}>
        삭제
      </button>
    );
}

export default DeleteBtn;
