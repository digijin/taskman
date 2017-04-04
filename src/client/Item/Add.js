

import React from 'react'
import { connect } from 'react-redux';

import DropDown from '../component/DropDown'
import type Type from 'Type';

import Select from 'react-select';
import Form from './Form'

type Props = {
	types: Array<Type>
}

class ItemAdd extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.submit = this.submit.bind(this);
		this.formChange = this.formChange.bind(this)
	}
	render() {
		return <div className="panel panel-default">
			<div className="panel-heading">Add Item</div>
			<Form onChange={this.formChange} state={this.state} />
			<input onClick={this.submit} type="submit" />
		</div>
	}
	formChange(e){
		// console.log('e', e);
		this.setState(e);
		
	}
	submit() {
		// console.log('state');
		this.props.submit(this.state);
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
		submit: (item) => {
			dispatch({ type: 'ADD_ITEM', item: item });
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdd);
