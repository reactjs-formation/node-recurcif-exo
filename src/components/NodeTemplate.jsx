import React from 'react';;

class NodeTemplate extends React.Component {
  render() {
    return (
        <li className="node">
            <div>
                <span>main</span>
                <button>+</button>
            </div>
        </li>
      );
  }
}

export default NodeTemplate;
