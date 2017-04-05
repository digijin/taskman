

import React from 'react'
import { connect } from 'react-redux';

import DropDown from '../component/DropDown'
import type Type from 'Type';

import Select from 'react-select';
import Form from './Form'

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import AppBar from 'material-ui/AppBar';

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

		return <Paper style={{padding: 20}}>
			<AppBar title="Add Item" />
			<Form onChange={this.formChange} state={this.state} />
			<RaisedButton onClick={this.submit} label="save" primary={true} />
		</Paper>
	}
	formChange(e){
		this.setState(e);
	}
	submit() {
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
