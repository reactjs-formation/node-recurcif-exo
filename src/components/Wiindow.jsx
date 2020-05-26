import React from 'react';

class Wiindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ...this.props
        }
        console.log('Wiindow constructor', this.props)
    }
    // componentDidUpdate(){
    //     console.log('wiindow componentDidUpdate')
    // }

    hChangeName = (e) => {
        console.log('hChangeName', this.state.parentNode, this.state.currentNode, e.target.value)
        this.state.currentNode.setName(e.target.value)
    }

    hChangeRadius = (e) => {
        console.log('hChangeRadius', this.state.parentNode, this.state.currentNode, e.target.value)
        
        this.state.currentNode.updateCSS({borderRadius: parseInt(e.target.value)})
    }

    hChangeBorderColor = (color) => {
        console.log('hChangeBorderColor', color);
        this.state.currentNode.updateCSS(color)
        // rafraichi le render pour voir quelle est
        // la couleur selectionné
        this.setState({},() =>{this.setState({})})
        // this.forceUpdate()
    }

    hClose = () => {
        this.props.hClose();
    }

    render(){

        const css = this.props.currentNode.state.css;
        let redItemSelected = '';
        let yellowItemSelected = '';
        let greenItemSelected = '';
        let blueItemSelected = '';

        if (css.borderColor === 'red') redItemSelected = 'selected';
        if (css.borderColor === 'yellow') yellowItemSelected = 'selected';
        if (css.borderColor === 'green') greenItemSelected = 'selected';
        if (css.borderColor === 'blue') blueItemSelected = 'selected';

        return (
            <div className="window window-box-shadow" id="win-0">
                <div className="window-container">
                    <div className="header">
                    <h1 className="title">SETTINGS</h1>
                    <div className="tools">
                        <a href="#" onClick={this.hClose}>Close</a>
                    </div>
                    </div>
                    <div className="body">
                    <div className="text-center">
                        <input type="text" placeholder="node name" id="winName" defaultValue={this.props.currentNode.state.nodeName} onChange={this.hChangeName} />
                    </div>
                    <h2 className="text-center">
                        Color
                    </h2>
                    <div className="text-center">
                        <div className={`item-color ${redItemSelected}`} id="itemColorRed" style={{backgroundColor: 'red'}} onClick={() => {this.hChangeBorderColor({borderColor: 'red'})}}></div>
                        <div className={`item-color ${yellowItemSelected}`} id="itemColorYellow" style={{backgroundColor: 'yellow'}} val="yellow" onClick={() => {this.hChangeBorderColor({borderColor: 'yellow'})}}></div>
                        <div className={`item-color ${greenItemSelected}`} id="itemColorGreen" style={{backgroundColor: 'green'}} val={{borderColor: 'green'}}  onClick={() => {this.hChangeBorderColor({borderColor: 'green'})}}></div>
                        <div className={`item-color ${blueItemSelected}`} id="itemColorBlue" style={{backgroundColor: 'blue'}} val="blue" onClick={() => {this.hChangeBorderColor({borderColor: 'blue'})}}></div>
                    </div>
                    <h2 className="text-center">
                        Radius
                    </h2>
                    <div className="text-center">
                        <button>
                        <i className="fas fa-less-than"></i>
                        </button>
                        <input type="text" className="text-center" placeholder="0" defaultValue={this.props.currentNode.state.css.borderRadius} onChange={this.hChangeRadius} />
                        <button>
                        <i className="fas fa-greater-than"></i>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Wiindow;
