// @flow

import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ItemList extends React.Component{
	render() {
		let rows = this.props.item.map((t, i) => {
			return <TableRow key={i}>
				<TableRowColumn>{t.getId()}</TableRowColumn>
				<TableRowColumn>{t.getType()}</TableRowColumn>
				<TableRowColumn>{t.getName()}</TableRowColumn>
				<TableRowColumn>
					<Link className="btn btn-default" to={'/item/edit/'+t.getId()}>edit</Link>
				</TableRowColumn>
			</TableRow>
		})
		return <div>
			<Table>
				<TableHeader><TableRow>
					<TableHeaderColumn>Id</TableHeaderColumn>
					<TableHeaderColumn>Type</TableHeaderColumn>
					<TableHeaderColumn>Name</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody>
				{rows}
				</TableBody>
			</Table>
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
