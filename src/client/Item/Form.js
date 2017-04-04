// @flow

import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';

import type Type from 'Type';
import type Item from 'Item';

type Props = {
	items: Array<Item>,
	types: Array<Type>
}

class ItemForm extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = props.state
	}
	changeField(field, value){
		
		this.state[field] = value;
		this.setState(this.state)
		this.props.onChange(this.state)
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
						this.changeField(f, e.target.value)

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
							if(e) this.changeField(f, e.value)
								// this.state[f] = e.value;
							// this.setState(this.state)
						}}
					/>
				</div>
				)
			})
		}


		return <div>
				type: 
				<Select 
					value={this.state.type}
					onChange={(e) => { 
						// this.setState({ type: e.value }); 
						this.changeField('type', e.value)
					}}
					options={typeOptions}
				/>
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
