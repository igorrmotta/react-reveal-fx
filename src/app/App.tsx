import * as React from 'react';
import './App.css';
import Example from './example/Example';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Reveal Fx</h2>
        </div>
        <div>
          <Example
            description="1) Reveal text"
            children={<h1>Hello</h1>}
            revealProps={{
              isContentHidden: true,
              revealSettings: {
                bgcolor: '#7f40f1',
                delay: 250,
                onCover: (contentEl, revealerEl) => {
                  contentEl.style.opacity = '1';
                  return true;
                }
              }
            }}
          />
        </div>
        <div>
          <Example
            description="1) Reveal text with an overlay text"
            children={<h1>Hello</h1>}
            revealProps={{
              isContentHidden: true,
              overlayContent: {
                delay: 5000,
                content: <div>text</div>
              },
              revealSettings: {
                bgcolor: '#7f40f1',
                delay: 250,
                onCover: (contentEl, revealerEl) => {
                  contentEl.style.opacity = '1';
                  return true;
                }
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export default App;
