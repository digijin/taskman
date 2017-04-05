// @flow

import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';

import type Type from 'Type';
import type Item from 'Item';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

type Props = {
	items: Array<Item>,
	types: Array<Type>
}

class ItemForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = props.state
	}
	changeField(field, value) {
		this.state[field] = value;
		this.setState(this.state)
		this.props.onChange(this.state)
	}

	dataFields(type) {
		return type.getDataFields().map(f => {
			// console.log('asd');
			
			return <div><TextField key={f}
			floatingLabelText={f}
			onChange={(e) => {
					// console.log('datafield changing')
					this.changeField(f, e.target.value)
				}}
			value={this.state[f]} /></div>
		})
	}
	attributeFields(type) {

		return type.getAttributeFields().map(f => {
			//for each field
			return <SelectField
				floatingLabelText={f}
				value={this.state[f]}
				onChange={(e,i,v) => {
					this.changeField(f, v)
				}} >
				{this.props.items.filter(i => {
					return i.getType() == f
				}).map(i=>{
					return <MenuItem value={i.getId()} primaryText={i.getName()} />
				})}
			</SelectField>

		})
		
	}

	render() {
		let typeOptions = this.props.types.map(t => {
			return { value: t.getId(), label: t.getName() }
		})
		let fields = [];
		if (this.state.type) {
			let type = this.props.types.filter(t => { return t.getId() == this.state.type })[0];
			// fields = [...this.dataFields(type), ...this.attributeFields(type)]
			let dataFields = this.dataFields(type);
			let attributeFields = this.attributeFields(type)
			fields = dataFields.concat(attributeFields);
		}
		return <div>
			<SelectField
				floatingLabelText="Item Type"
				value={this.state.type}
				onChange={(e, i, v) => {
					// this.setState({ type: e.value }); 
					this.changeField('type', v)
				}}
			>
				<MenuItem value={null} primaryText="" />
				{this.props.types.map(t => {
					let val = t.getId();
					let label = t.getName()
					return <MenuItem value={val} primaryText={label} />
				})}
			</SelectField>
			<br />
			{fields}
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

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);
