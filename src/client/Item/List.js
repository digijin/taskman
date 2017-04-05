// @flow

import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'

class ItemList extends React.Component{
	render() {
		let rows = this.props.item.map((t, i) => {
			return <tr key={i}>
				<td>{t.getId()}</td>
				<td>{t.getType()}</td>
				<td>{t.getName()}</td>
				<td>
					<Link className="btn btn-default" to={'/item/edit/'+t.getId()}>edit</Link>
				</td>
			</tr>
		})
		return <div>
			<h1>Items</h1>
			<table className="table">
				<thead><tr>
					<td>Id</td>
					<td>Type</td>
					<td>Name</td>
					</tr>
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
