import * as React from 'react';
import './App.css';
import RevealFx from './lib/RevealFx';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <RevealFx
            isContentHidden={true}
            revealSettings={{
              bgcolor: '#7f40f1',
              delay: 250,
              onCover: (contentEl, revealerEl) => {
                contentEl.style.opacity = '1';
                return true;
              }
            }}
          >
            <h1>Hello</h1>
          </RevealFx>
        </div>
      </div>
    );
  }
}

export default App;
