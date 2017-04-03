// @flow

import React from 'react'
import { connect } from 'react-redux';

class ItemList extends React.Component{
	render() {
		let rows = this.props.item.map(t => {
			return <tr>
				<td>{t.getName()}</td>
			</tr>
		})
		return <div>
			<h1>Items</h1>
			<table className="table">
				<thead>
					<th>Name</th>
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
		item: state.item
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
		close: () => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
