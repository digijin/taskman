
import React, { PropTypes } from 'react';
import {DragSource} from 'react-dnd'
import {Link} from 'react-router-dom'
// import { ItemTypes } from './Constants';



/**
 * Implements the drag source contract.
 */
const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
	  item: props.item
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
				<h4 className="title">{this.props.item.getName()}</h4>
				<p className="text">{this.props.item.description}</p>
        <Link className="btn btn-default" to={'/item/edit/'+this.props.item.getId()}>edit</Link>
		</div>)
	}
}
Card.propTypes = propTypes;

// Export the wrapped component:
export default DragSource('card', cardSource, collect)(Card);