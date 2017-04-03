
import React from 'react'
import { connect } from 'react-redux';

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
		let type = this.props.match.params.type;
		let column = this.props.match.params.column;

		let items = this.props.items.filter(i => {
			i.getType() == type;
		})
		let columns = this.props.items.filter(i => {
			i.getType() == column;
		})



		return <div>
			{type} - {column}
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

export default connect(mapStateToProps, mapDispatchToProps)(Board);
// export default Board