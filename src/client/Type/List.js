// @flow

import React from 'react'
import { connect } from 'react-redux';

class TypeList extends React.Component{
	render() {
		// let rows = [];
		// this.props.type.forEach(t => {
		// 	rows.push(<div>{t.name}</div>)
		// })
		let rows = this.props.type.map(t => {
			return <tr>
				<td>{t.getName()}</td>
				<td>{t.getDataFields().join(', ')}</td>
				<td>{t.getAttributeFields().join(', ')}</td>
			</tr>
		})
		return <div>
			<h1>Types</h1>
			<table className="table">
				<thead>
					<th>Name</th>
					<th>data fields</th>
					<th>attributes</th>
				</thead>
				<tbody>
				{rows}
				</tbody>
			</table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TypeList);
