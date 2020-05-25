import React from 'react';
import Node from './components/Node';
import NodeTemplate from './components/NodeTemplate'
import './App.css';

class App extends React.Component {

  options = (e, obj, brotherIndex) => {
    e.preventDefault();
    console.log('App options', obj.state, 'brotherIndex', brotherIndex)
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
