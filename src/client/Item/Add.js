

import React from 'react'
import { connect } from 'react-redux';

import DropDown from '../component/DropDown'
import type Type from 'Type';

type Props = {
	types: Array<Type>
}

class ItemAdd extends React.Component{

	constructor(props){
		super(props)
		this.state = {}
		this.submit = this.submit.bind(this)
	}
	render() {

		let typeOptions = this.props.types.map(t => {
			return {value: t.getId(), label: t.getName()}
		})

		let fields = [];
		if(this.state.type){
			let type = this.props.types.filter(t => {return t.getId() == this.state.type})[0];
			type.getDataFields().forEach(f => {

				fields.push(<div key={f}>
					{f}<br />
					<input onChange={e => {
						this.state[f] = e.target.value;
						this.setState(this.state)
						
					}} type="text" placeholder={f} value={this.state[f]} />
				</div>
				)
			})
		}

		return <div className="panel panel-default">
			<div className="panel-heading">Add Item</div>
			type: <DropDown 
				selected={this.state.type}
				onChange={(e) => {this.setState({type:e});}} 
				options={typeOptions} />
				{fields}
			<input onClick={this.submit} type="submit" />
		</div>
	}
	submit(){
		// console.log('state');
		this.props.add(this.state);
	}
}
function mapStateToProps(state:Object, props:Object):Object {
	return {
		types: state.type
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
		add: (item) => {
			dispatch({type:'ADD_ITEM', item: item});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdd);
