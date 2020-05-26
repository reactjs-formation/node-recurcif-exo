import React from 'react';

class Node extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            childs:  [],
            forceRender: false,
            css: (this.props.css === undefined) ? {} : this.props.css,
            nodeName: (this.props.nodeName === undefined) ? 'Node' : this.props.nodeName
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextProps, nextState)


        // Le premier noeud par defaut détermine si le rendu est a faire.
        // si le render n'est pas défini c'est que c'est un enfant alors on permet le rendu.
        // si on change un des enfants alors forceRender permet de faire le rendu
        return (nextProps.render === true || nextProps.render === undefined) || nextState.forceRender
    }


    addNode = (e) => {
        e.preventDefault();
        
        this.state.childs.push({
            css:{
                backgroundColor:'black',
                color:'white',
                borderStyle: 'solid',
                borderWidth: 2,
                borderColor: 'red',
                borderRadius: 10
            }, 
            nodeName:'Node'
        })

        this.setState({
            childs: this.state.childs
        }, () => {
            console.log('addNode setState', this.state, 'deep', this.props.index)
        })
    }

    setName = (name) => {
        console.log('node', this.props.index,  'setName', name, 'this.state.childs', this.state.childs);
        this.setState({ nodeName: name })
    }
    updateCSS(css) {
        console.log('node', this.props.index,  'updateCSS', css, 'this.state.childs', this.state.childs);
        this.setState({
            css: {...this.state.css, ...css}
        }, () => {
            console.log('updateCSS', this.state.css)
        }) 
    }

    options = (e, brotherIndex) => {
        e.preventDefault();
        this.props.options(this.props.parent, this)
    }

    render() {
        console.log('Render ', this.props.index+''+this.props.brotherIndex, this.state);

        // let nodeName = 'Node';
        // if (this.props.nodeName !== undefined) {
        //     nodeName = this.props.nodeName;
        // }

        return (
        (this.props.index < this.props.deepIndex) 
            && (/*console.log('this.props', this.props, 'this.state', this.state) || */ true) 
            &&   <>
                        <ul>
                            <li className="node" style={this.state.css}>
                                <div>
                                    <span className="btn"><button onClick={(e) => {this.options(e, this.props.brotherIndex)}} className="options">Options</button></span>
                                    <span className="title">{this.state.nodeName} {this.props.index}{this.props.brotherIndex}</span>
                                    <button className="btn-add-node" onClick={this.addNode}>+</button>
                                </div>
                            </li>
                            {this.state.childs.map((elm,i) => {
                                
                                return <Node 
                                    key={i}
                                    index={this.props.index+1} 
                                    deepIndex={this.props.deepIndex} 
                                    childs={this.state.childs} 
                                    parent={this} 
                                    brotherIndex={i}
                                    css={elm.css}
                                    nodeName={elm.nodeName}
                                    options={this.props.options}
                                />;
                            })}
                        </ul>
                </>
        );
    }
}

export default Node;
