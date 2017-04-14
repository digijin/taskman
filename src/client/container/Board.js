
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
		this.scrollSpeed = 0;
		setInterval(this.doScroll, 10)
	}
	doScroll = () => {
		this.board.scrollLeft += this.scrollSpeed;
	}
	scrollSpeed: number

	board: HTMLDivElement

	render(){

		let config;
		if(this.props.match.params.id){

			config = this.props.boards.filter(b => {
				return b.url == this.props.match.params.id
			})[0]
		}else{
			let type = this.props.match.params.type;
			let column = this.props.match.params.column;
			config = {
				column: {type:column},
				name: type,
				type: type
			}
		}
		let typeData = this.props.types.filter(t => {return t.getId()==config.type})[0]

		let items = this.props.items.filter(i => {
			return i.getType() == config.type;
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
			return i.getType() == config.column.type;
		}).map(i => {
			//TODO none column
			return <Column key={i.getName()} 
				id={i.getId()} 
				items={items.filter(itm=>{
					return itm[config.column.type] == i.getId();
				})}
				name={i.getName()} 
				type={config.column.type} />
		})
		columns.push(<Column key="undefined" items={items.filter(itm=>{
					return !itm[config.column.type];
				})} name="undefined" 
				type={config.column.type} />)

		return <div>
			<AppBar
				title={<span>{config.type}</span>}
				iconElementRight={<Add style={{"margin-top": 6}} />}
			/>
			<Filters onChange={this.onFilterChange} type={typeData} />
			<div onMouseMove={this.onMouseMove} ref={b => {this.board = b}} style={{
				overflowX: 'scroll',
				overflowY: 'scroll',
				//width: '100%',
				//height: '100%',
				position: 'absolute',
				top: 140,
				bottom: 0,
				right: 0,
				left: 0
				}}>
				{/*<div 
				onMouseOver={this.onLeftOver} onMouseOut={this.onLeftOut}
				style={{
					border: '8px solid purple',
					position: 'absolute',
					left: 0,
					width: 150,
					top: 0,
					bottom: 0,
					//zIndex: 1000
				}}></div>*/}
				<div className="board">
					{columns}
				</div>
			</div>
		</div>
	}
	onFilterChange = (e) => {
		this.setState({filters:e})
	}
	onMouseMove = (e) => {
		// console.log('e', e);
		// console.log('e', e.screenX, e.pageX, e.clientX, window.innerWidth);
		let size = 150;
		this.scrollSpeed *=0.5;
		if(e.clientX < size){
			this.scrollSpeed --
		}
		if(e.clientX > (window.innerWidth - size)){
			this.scrollSpeed ++
		}
		// debugger
	}
	// onLeftOver = (e) => {
	// 	// console.log('left', this.board, this.board.scrollLeft)
	// 	this.board.scrollLeft -= 10

	// }
	// onLeftOut = (e) => {
	// 	// console.log('left out')
	// }
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