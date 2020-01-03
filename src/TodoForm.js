import React, {Component} from 'react';
import './style.css';

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



// // function saveTasks(key, array) {
// //   localStorage.setItem(key, JSON.stringify(array));
// // }

// class PushTodo extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tasks: [],
//     };
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const input = e.target[0];
//     const text = input.value;
//     const newId = getId();
//     const newTask = {
//       id: newId,
//       content: text,
//     };
//     this.setState({ tasks: this.state.tasks.concat({tasks:'곽혜림'})});
//     console.log(this.state.tasks);
//     // saveTasks('TODO', )
//     // this.context.saveTasks();
//     // paintTodo(currentValue);
//     // input.value = '';
//   }

//   render() {
//     // const test = this.context.tasks;
//     // console.log(test);
//     return <Input onSubmit={this.handleSubmit} />;
//   }
// }

export default TodoForm;




