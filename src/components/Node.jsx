import React from 'react';
import NodeTemplate from './NodeTemplate'

class Node extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            childs:  []
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
                console.log('css set ', childIndex, dataCSS)
                //return new Promise((resolve) => {
                    //this.setState({ css: dataCSS }, resolve)
                    this.state.childs[childIndex] = {css: dataCSS};
                    this.setState({ childs: this.state.childs })
                //});
            }
        }
    }

    options = (e, brotherIndex) => {
        e.preventDefault();
        console.log('node options this.props.child', this.props.child);
        this.props.options(this.props.parent, brotherIndex)
    }

    render() {
        console.log('Render ', this.props.index+''+this.props.brotherIndex, this.state)
        return (
        (this.props.index < this.props.deepIndex) 
            && (/*console.log('this.props', this.props, 'this.state', this.state) || */ true) 
            &&   <>
                        <ul>
                            <li className="node" style={this.props.css}>
                                <div>
                                    <button onClick={(e) => {this.options(e, this.props.brotherIndex)}}>Options</button>
                                    <span>Node {this.props.index}{this.props.brotherIndex}</span>
                                    <button onClick={this.addNode}>+</button>
                                </div>
                            </li>
                            {this.state.childs.map((elm,i) => {
                                
                                return <Node 
                                    index={this.props.index+1} 
                                    deepIndex={this.props.deepIndex} 
                                    childs={this.state.childs} 
                                    parent={this} 
                                    brotherIndex={i}
                                    css={elm.css}
                                    options={this.props.options}
                                />;
                            })}
                        </ul>
                </>
        );
    }
}

export default Node;
