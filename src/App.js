import React from 'react';
import Node from './components/Node';
import Wiindow from './components/Wiindow'
import './App.css';
import CSS_COLOR_NAMES from './config/color'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      render: true,
      winOpen: false,
      data: {}
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  options = (parentObj, childObj) => {
    //console.log('App options', obj.state, 'brotherIndex', brotherIndex, 'obj.props', obj.props);

    // const backColor = CSS_COLOR_NAMES[this.getRandomInt(CSS_COLOR_NAMES.length-1)];
    // obj.css().set(brotherIndex, {backgroundColor: backColor})
    // obj.setName(brotherIndex, 'Test');
    // this.setState({
      
    // })
    // console.log('random colors', backColor)

    let data = {
      currentNode:  childObj,
      parentNode:   parentObj,
    }
    console.log('options data', parentObj.state, childObj.state)


    this.setState({
      winOpen: false
    }, () => {
      this.setState({
        data:data, 
        render:false,
        winOpen: true
      })
    })

  }

  hChangeName = (e) => {
    console.log('hChangeName');
    this.state.inputs[e.target.id]= e.target.value;
    this.setState({
      inputs: this.state.inputs
    });
    this.state.parentNode.setName(this.state.brotherIndex, e.target.value);
  }

  hChangeBorderColor = (e) => {
    console.log('hChangeBorderColor');
    this.state.inputs[e.target.id]= e.target.value;
    this.setState({
      inputs: this.state.inputs
    });
    this.state.parentNode.setName(this.state.brotherIndex, e.target.value);
  }

  hClose = () => {
    this.setState({
      render:false,
      winOpen: !this.state.winOpen
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.winOpen && <Wiindow {...this.state.data} hClose={this.hClose} />}
        <Node index={0} deepIndex={8} childs={[]} options={this.options} render={this.state.render} />
      </div>
    );
  }
}

export default App;
