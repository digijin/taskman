
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd'
import { Link } from 'react-router-dom'
// import { ItemTypes } from './Constants';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


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

class ItemCard extends React.Component {
  render() {
    const { isDragging, connectDragSource, text } = this.props;

    return connectDragSource(<div className="edit">
      <Card style={{ "margin-bottom": 10, opacity: isDragging ? 0.5 : 1 }} className="card">
        <CardTitle title={this.props.item.getName()}/>
        <CardText>{this.props.item.description}</CardText>
      </Card>
    </div>)

  }
}
ItemCard.propTypes = propTypes;

// Export the wrapped component:
export default DragSource('card', cardSource, collect)(ItemCard);