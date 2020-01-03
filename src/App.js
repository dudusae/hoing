import React, { Component } from 'react';
import Dnd from './dnd';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.saveTasks = (text) => {
  //     console.log('꺄',text);
  //   }
  //   this.state = {
  //     tasks: '곽혜림',
  //     saveTasks : this.saveTasks,
  // }
  //   }

  render() {
   
    return (
      // <MyContext.Provider value={this.state}>
      <Dnd/>
      // </MyContext.Provider>
    );
  }
}

export default App;
