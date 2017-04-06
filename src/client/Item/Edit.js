
import React from 'react';
import { connect } from 'react-redux';
import Form from './Form'

import Dialog from 'material-ui/Dialog';

class ItemEdit extends React.Component{
	
	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this);
		this.formChange = this.formChange.bind(this)

		let id = props.id;
		if(!id) id = props.match.params.id;

		let item = this.props.items.filter(i=>{return i.getId() == id})[0];

		this.state = item
	}
	formChange(e){
		this.setState(e);
	}
	submit() {
		this.props.submit(this.state);
	}
	render(){
		if(!this.state){
			return <Dialog title="Error" open="true">
					could not find item
				</Dialog>
		}

		return <div className="panel panel-default">
			<div className="panel-heading">Edit Item</div>
			<div className="panel-body">
				id: {this.state.id}
				<Form onChange={this.formChange} state={this.state} />
				<input onClick={this.submit} type="submit" />
				<hr />
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</div>
		</div>
	}
}

function mapStateToProps(state: Object, props: Object): Object {
	return {
		items: state.item
	};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		submit: (item) => {
			dispatch({ type: 'UPDATE_ITEM', item: item });
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEdit);
