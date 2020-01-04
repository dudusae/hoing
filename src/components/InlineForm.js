import React, { Component } from 'react';
import './../style.css';

class InlineForm extends Component {
  state = {
    id: '',
    content: this.props.item.content
  };

  handleChange = (id, e) => {
    this.setState({
      content: e.target.value,
      id: id,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onUpdate(this.state);
    this.setState({
      id: '',
      content: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} onBlur={this.handleSubmit}>
        <input
        autoFocus="on"
          type="input"
          className="inline__field"
          autoComplete="none"
          value={this.state.content}
          onChange={e => this.handleChange(this.props.item.id, e)}
        />
      </form>
    );
  }
}

export default InlineForm;
