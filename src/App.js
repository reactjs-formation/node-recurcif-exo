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
        <Node index={0} deepIndex={8} childs={[]} options={this.options} />
      </div>
    );
  }
}

export default App;
