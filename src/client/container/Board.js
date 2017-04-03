
import React from 'react'

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Card from '../component/Card'
/** each board is looking at a type of item. 
 * it needs an attribute for columns and can take 
 * another attribute for swimlanes 
 * also uses a filter */

type Props = {
	type: number,
	column:number,
	swimlane?: number,
	filter?: Function
}

class Board extends React.Component{

	render(){
		let type = this.props.match.type;
		let column = this.props.match.column;

		return <div>
			<Card />
			<Card />
		</div>
	}
}

function mapStateToProps(state: Object, props: Object): Object {
	return {
		types: state.type,
		items: state.item
	};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		change: (item) => {
			dispatch({ type: 'CHANGE_ITEM', item: item });
		}
	};
}

export default DragDropContext(HTML5Backend)(Board)