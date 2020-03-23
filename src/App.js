import React, { Component } from 'react';
import Dnd from './Dnd';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
      <header className="header">Hoing <span className="header__overline">집중+뿌듯</span></header>
      <div className="dnd__container">
      <Route path="/" component={Dnd} />
    </div>
    </Router>
    );
  }
}

export default App;
