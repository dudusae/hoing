import React, { Component } from 'react';
import './../style.css';

class DeleteBtn extends Component {

  handleRemove = e => {
    const { id, onRemove } = this.props;
    onRemove(id);
  };

  render() {
    return (
      <button className="delete__btn" onClick={this.handleRemove}>
        삭제
      </button>
    );
  }
}

export default DeleteBtn;
