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
    const { from, onUpdate } = this.props;
    e.preventDefault();
    onUpdate(this.state, from);
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
