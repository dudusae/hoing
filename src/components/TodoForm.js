import React, {Component} from 'react';
import './../style.css';

const getId = () => {
  let newId = Date.now() + Math.ceil(Math.random() * 100);
  newId = JSON.stringify(newId);
  return newId;
};


class TodoForm extends Component{
  state = {
    id:'',
    content:''
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
      id: getId()
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      id: '',
      content: ''
    })
  }


render(){
  return (
    <form className="form__group field" onSubmit={this.handleSubmit}>
      <input
        type="input"
        className="form__field"
        placeholder="할 일을 입력해주세요"
        name="content"
        id="name"
        required
        autoComplete="none"
        value={this.state.content}
        onChange={this.handleChange}
      />
      <label htmlFor="name" className="form__label">
        할 일을 입력해주세요
      </label>
    </form>
  );
};

}



export default TodoForm;




