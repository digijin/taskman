
import React, { PropTypes } from 'react';
import { DragSource } from 'react-dnd'
import { Link } from 'react-router-dom'
// import { ItemTypes } from './Constants';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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
      <Card style={{ "marginBottom": 10, opacity: isDragging ? 0.5 : 1 }} className="card">
        <CardHeader 
          title={this.props.item.getId()}
          actAsExpander={true}
          showExpandableButton={true} />
        <CardTitle title={this.props.item.getName()}/>
        <CardText expandable={true}>{this.props.item.description}</CardText>
        <CardActions expandable={true}>
          <Link to={'/item/edit/'+this.props.item.getId()}><FlatButton label="edit" /></Link>
          <FlatButton label="transition" />
        </CardActions>

      </Card>
    </div>)

  }
}
ItemCard.propTypes = propTypes;

// Export the wrapped component:
export default DragSource('card', cardSource, collect)(ItemCard);