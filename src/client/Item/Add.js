

import React from 'react'
import { connect } from 'react-redux';

import DropDown from '../component/DropDown'

class ItemAdd extends React.Component{
	render() {

		let typeOptions = this.props.type.map(t => {
			return {value: t.getId(), label: t.getName()}
		})

		return <div className="panel panel-default">
			<div className="panel-heading">Add Item</div>
			type: <DropDown 
				onChange={(e) => {console.log(e);}} 
				options={typeOptions} />
			<input type="submit" />
		</div>
	}
}
function mapStateToProps(state:Object, props:Object):Object {
	return {
		type: state.type
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
		close: () => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemAdd);
