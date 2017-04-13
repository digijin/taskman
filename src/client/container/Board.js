
import React from 'react'
import { connect } from 'react-redux';

import Card from '../component/Card'
import Column from '../Board/Column'

import Filters from '../Board/Filters'
import Add from '../Item/Add'
import AppBar from 'material-ui/AppBar';

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

	constructor(props){
		super(props);
		this.state = {filters:[]}
	}

	render(){
		let type = this.props.match.params.type;
		let typeData = this.props.types.filter(t => {return t.getId()==type})[0]
		let column = this.props.match.params.column;

		let items = this.props.items.filter(i => {
			return i.getType() == type;
		}).filter(i => {
			//that confirm to all filters
			let item = i;
			for(let f = 0; f < this.state.filters.length; f++){
				let filter =  this.state.filters[f];
				if(!eval(filter)){
					return false
				}
			}
			return true;
		})

		let columns = this.props.items.filter(i => {
			//items of the right type
			return i.getType() == column;
		}).map(i => {
			//TODO none column
			return <Column key={i.getName()} 
				id={i.getId()} 
				items={items.filter(itm=>{
					return itm[column] == i.getId();
				})}
				name={i.getName()} 
				type={column} />
		})
		columns.push(<Column key="undefined" items={items.filter(itm=>{
					return !itm[column];
				})} name="undefined" 
				type={column} />)

		return <div>
			<AppBar
				title={<span>{type}</span>}
				iconElementRight={<Add style={{"margin-top": 6}} />}
			/>
			<Filters onChange={this.onFilterChange} type={typeData} />
			<div className="board">
				{columns}
			</div>
		</div>
	}
	onFilterChange = (e) => {
		this.setState({filters:e})
	}
}

function mapStateToProps(state: Object, props: Object): Object {
	return {
		types: state.type,
		items: state.item,
		boards: state.board
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