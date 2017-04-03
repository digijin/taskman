
import React, { PropTypes } from 'react';
import {DragSource} from 'react-dnd'
// import { ItemTypes } from './Constants';



/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class Card extends React.Component{
	render(){
		const { isDragging, connectDragSource, text } = this.props;
		return connectDragSource(<div style={{opacity: isDragging ? 0.5 : 1}} className="card panel">
				<h4 className="title">Card title</h4>
				<p className="text">Some quick example text to build</p>
		</div>)
	}
}
Card.propTypes = propTypes;

// Export the wrapped component:
export default DragSource('card', cardSource, collect)(Card);