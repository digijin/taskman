
import React from 'react'

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

export default class Board extends React.Component{

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

class Card extends React.Component{
	render(){
		return <div className="well card">
				<h4 className="title">Card title</h4>
				<p className="text">Some quick example text to build</p>
		</div>
	}
}