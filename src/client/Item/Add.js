

import React from 'react'
import { connect } from 'react-redux';

import DropDown from '../component/DropDown'
import type Type from 'Type';

import Select from 'react-select';

type Props = {
	types: Array<Type>
}

class ItemAdd extends React.Component {

	constructor(props) {
		super(props)
		this.state = {}
		this.submit = this.submit.bind(this)
	}
	render() {

		let typeOptions = this.props.types.map(t => {
			return { value: t.getId(), label: t.getName() }
		})

		let fields = [];
		if (this.state.type) {
			let type = this.props.types.filter(t => { return t.getId() == this.state.type })[0];
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
			type.getAttributeFields().forEach(f => {
				let fieldOptions = this.props.items.filter(i => {
					return i.getType() == f
				}).map(i => {
					return { value: i.getId(), label: i.getName() }
				});
				fields.push(<div key={f}>
					{f}<br />
					<Select
						name="form-field-name"
						value={this.state[f]}
						options={fieldOptions}
						onChange={e => {
							if(e)
								this.state[f] = e.value;
							this.setState(this.state)
						}}
					/>
				</div>
				)
			})
		}

		return <div className="panel panel-default">
			<div className="panel-heading">Add Item</div>
			type: 
			<Select 
				value={this.state.type}
				onChange={(e) => { 
					this.setState({ type: e.value }); 
				}}
				options={typeOptions}
			/>
			{fields}
			<input onClick={this.submit} type="submit" />
		</div>
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
