import React, { Component } from 'react';
import particlesJS from 'particles.js'

import logo from './stars-animation.gif';
import './App.css';
import { getUsers, newUser } from './apicalls.js';
import particleSettings from './particles.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {users: []};
  }

  componentDidMount () {
    getUsers().then(users => this.setState({users}));
  }

  render() {
    const users = this.state.users;
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header-color"></div>
          {/*<!-- particles.js container -->*/}
          <div id="particles-js" ref={ node => {
            if (!node) return;
            console.log('ref');
            window.particlesJS("particles-js", particleSettings);
          }}></div>
          <script src="particles.js"></script>
          {/*<!-- particles.js lib (JavaScript CodePen settings): https://github.com/VincentGarreau/particles.js -->*/}
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Postgres+React<br/>Project Base</h1>
        </header>
        <p className="App-intro">
          When everything is initialized correctly, a sample user will be output below.
        </p>
        <button onClick={() => {
          newUser().then(() => {
            getUsers().then(users => this.setState({users}))
          });
        }}>Update Users</button>
        <ul className="App-sample-list">
        {
          users.map(user => {
            return (
              <li key={user.id}>{user.firstName} {user.lastName} | {user.email}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default App;
