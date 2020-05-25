import React from 'react';
import Node from './components/Node';
import NodeTemplate from './components/NodeTemplate'
import './App.css';
import CSS_COLOR_NAMES from './config/color'

class App extends React.Component {

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  options = (obj, brotherIndex) => {
    console.log('App options', obj.state, 'brotherIndex', brotherIndex);

    const backColor = CSS_COLOR_NAMES[this.getRandomInt(CSS_COLOR_NAMES.length-1)];
    obj.css().set(brotherIndex, {backgroundColor: backColor})
    console.log('random colors', backColor)
  }

  render() {
    return (
      <div className="App">
        <div className="window window-box-shadow">
          <div className="window-container">
            <div className="header">
              <h1 className="title">SETTINGS</h1>
              <div className="tools">
                <a href="#">Fermer</a>
              </div>
            </div>
            <div className="body">
              <div className="text-center">
                <input type="text" placeholder="node name" />
              </div>
              <h2 className="text-center">
                Color
              </h2>
              <div className="text-center">
                <div className="item-color" style={{backgroundColor: 'red'}}></div>
                <div className="item-color" style={{backgroundColor: 'yellow'}}></div>
                <div className="item-color" style={{backgroundColor: 'green'}}></div>
                <div className="item-color" style={{backgroundColor: 'blue'}}></div>
              </div>
              <h2 className="text-center">
                Radius
              </h2>
              <div className="text-center">
                <button>&lt;</button>
                <input type="text" className="text-center" placeholder="0" />
                <button>&gt;</button>
              </div>
            </div>
          </div>
        </div>
        <Node index={0} deepIndex={8} childs={[]} options={this.options} />
        
      </div>
    );
  }
}

export default App;
