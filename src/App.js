import React, { Component } from 'react';
import Dnd from './Dnd';

class App extends Component {
  render() {
    return (
      <>
      <header className="header">Hoing <span className="header__overline">집중+뿌듯</span></header>
      <div className="dnd__container">
    <Dnd />
    </div>
    </>
    );
  }
}

export default App;
