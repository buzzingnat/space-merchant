import React, { Component } from 'react';
import logo from './stars-animation.gif';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-color"></div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Space <br/>Merchant</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
