
import React from 'react';
import Card from '../component/Card';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import {flow} from 'lodash';

class Column extends React.Component{
	render(){
		let cards = this.props.items.map(i => {
			return <Card key={i.getId()} id={i.getId()} item={i} />
		})
		const { isOver, canDrop, connectDropTarget } = this.props;
		return connectDropTarget(<div className="well column">
			<h3>{this.props.name}</h3>
			{cards}
			</div>)
	}
}

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

let dropTarget = {
	canDrop(props, monitor) {
		return true
	},
	hover(props, monitor, component) {

	},
	drop(props, monitor, component) {
		if (monitor.didDrop()) return;
		const item = monitor.getItem();
		props.transition(item.id, props.type, props.id)
		return { moved: true };
	}

};

function mapStateToProps(state: Object, props: Object): Object {
	return {};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		transition: (id, field, value) => {
			dispatch({ type: 'UPDATE_ITEM_FIELD', id:id, field:field, value:value });
		}
	};
}

// export default DropTarget('card', dropTarget, collect)(Column);
export default flow(
	DropTarget('card', dropTarget, collect),
	connect(mapStateToProps, mapDispatchToProps)
)(Column)