import React from 'react';

class Node extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            childs:  [],
            forceRender: false,
            css: (this.props.css === undefined) ? {} : this.props.css,
            nodeName: (this.props.nodeName === undefined) ? 'Node' : this.props.nodeName,
            weight:0
        }

        // donne l'obj enfant au parent
        if (this.props.parent)
            this.props.parent.updateChild(this.props.brotherIndex , this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.log('shouldComponentUpdate', nextProps, nextState)


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
            nodeName:'Node',
            obj: {}
        })

        this.setState({
            childs: this.state.childs,
            //weight: this.state.childs.length
        }, () => {
            //console.log('addNode setState', this.state, 'deep', this.props.index)
            //if (this.props.parent) {
                // if (this.state.childs.length > 1) 
                    // this.props.parent.updateWeight(this.state.childs.length);
                    this.updateWeight();
            //}
        })
    }

    updateWeight() {
        // console.log('updateWeight index(',this.props.index,')', this.state.weight, this.state.childs.length)
        //console.log('updateWeight index(',this.props.index,')', this.state.childs)

        let virtualChilds = 0;
        this.state.childs.map((elm,i) => {
            //console.log('Calcule: ', elm.obj.state.childs.length);
            if (elm.obj.state.childs.length === 0) {
                virtualChilds++;
                //console.log('virtualChilds = elm.obj.state.childs.length: ', virtualChilds,'++', elm.obj.state.childs.length);
            }else {
                virtualChilds += elm.obj.state.childs.length;
                //console.log('virtualChilds = elm.obj.state.childs.length: ', virtualChilds,'+=', elm.obj.state.childs.length);
            }
        })
        console.log('virtualChilds index(',this.props.index,')', virtualChilds);


        this.setState({
            weight: virtualChilds
        })

        if (this.props.parent) this.props.parent.updateWeight();


        // (this.state.childs-1) le parent recalcule ces nombres d'enfant sauf celui qui
        // informe des ces enfants car il ne prend plus la place de 1.
        // +weightChild le parent remplace le 1 par le nouveau nombre d'enfant que celui ci contient.

        // this.setState({weight: (this.state.childs.length-1)+weightChild}, () => {
        //     if (this.props.parent) this.props.parent.updateWeight(this.state.weight);
        // })
    }

    // recupere l'enfant apres ça création
    updateChild(brotherIndex, child){
        this.state.childs[brotherIndex].obj = child;
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
        //console.log('Render ', this.props.index+''+this.props.brotherIndex, this.state);

        // let nodeName = 'Node';
        // if (this.props.nodeName !== undefined) {
        //     nodeName = this.props.nodeName;
        // }

        let h = 47*this.state.childs.length;
        this.state.childs.map((elm,i) => {
            h += (i) ? 47 : 0
        })
        

        return (
        (this.props.index < this.props.deepIndex) 
            && (/*console.log('this.props', this.props, 'this.state', this.state) || */ true) 
            &&   <>
                    <div className="ul" style={this.props.ulCSS}>
                        <div className="node" style={this.state.css}>
                            <div>
                                <span className="btn">
                                    <button onClick={(e) => {this.options(e, this.props.brotherIndex)}} className="options">Options</button>
                                </span>
                                <span className="title">{this.state.nodeName} {this.props.index}.{this.props.brotherIndex}_{this.state.weight}</span>
                                <button className="btn-add-node" onClick={this.addNode}>+</button>
                            </div>
                        </div>
                        {this.state.childs.length && <div className="links" style={{height: h}}></div> }
                        {this.state.childs.map((elm,i) => {

                            let top = 0;
                            if (i===0) top = -h; 


                            //console.log('render node', 'marginTop', top)
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
                                updateWeight={this.updateWeight}
                                ulCSS={{marginTop: top}}
                            />;
                        })}
                    </div>
                </>
        );
    }
}

export default Node;
