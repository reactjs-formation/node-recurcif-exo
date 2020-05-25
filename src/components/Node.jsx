import React from 'react';
import NodeTemplate from './NodeTemplate'

class Node extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            childs: []
        }
    }


    addNode = (e) => {
        e.preventDefault();
        
        this.state.childs.push({css:{backgroundColor:'cadetblue'}})

        this.setState({
            childs: this.state.childs
        }, () => {
            console.log('addNode setState', this.state, 'deep', this.props.index)
        })
    }

    css = () => {
        return {
            set: (childIndex, dataCSS) => {
                //return new Promise((resolve) => {
                    //this.setState({ css: dataCSS }, resolve)
                    this.state.childs[childIndex] = {css: dataCSS};
                    this.setState({ childs: this.state.childs })
                //});
            }
        }
    }

    options = (e) => {
        e.preventDefault();
        this.props.options(e, this)
    }

    render() {
        return (
        (this.props.index < this.props.deepIndex) 
            && (console.log('this.props.index', this.props.index) || true) 
            && (this.props.index === 0 || this.props.childs.length) 
            && <ul>
                    <li className="node" style={this.props.css}>
                        <div>
                            <button onClick={this.options}>Options</button>
                            <span>Node {this.props.index}{this.props.brotherIndex}</span>
                            <button onClick={this.addNode}>+</button>
                        </div>
                    </li>
                    {this.state.childs.map((elm,i) => {
                        
                        return <Node 
                            index={this.props.index+1} 
                            deepIndex={this.props.deepIndex} 
                            childs={this.state.childs} 
                            brotherIndex={i}
                            css={elm.css}
                            options={this.props.options}
                        />;
                    })}
                </ul>
        );
    }
}

export default Node;
