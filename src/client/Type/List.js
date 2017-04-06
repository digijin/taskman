// @flow

import React from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
class TypeList extends React.Component{
	render() {
		// let rows = [];
		// this.props.type.forEach(t => {
		// 	rows.push(<div>{t.name}</div>)
		// })
		let rows = this.props.type.map(t => {
			return <TableRow key={t.getId()}>
				<TableRowColumn>{t.getName()}</TableRowColumn>
				<TableRowColumn>{t.getDataFields().join(', ')}</TableRowColumn>
				<TableRowColumn>{t.getAttributeFields().join(', ')}</TableRowColumn>
				<TableRowColumn>
					<Link className="btn btn-default" to={'/type/'+t.getId()}>
						<span className="glyphicon glyphicon-list"></span>
					</Link>
					<Link className="btn btn-default" to={'/type/edit/'+t.getId()}>
					<span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
					</Link>
				</TableRowColumn>
			</TableRow>
		})
		return <div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHeaderColumn>Name</TableHeaderColumn>
						<TableHeaderColumn>data fields</TableHeaderColumn>
						<TableHeaderColumn>attributes</TableHeaderColumn>
						<TableHeaderColumn>actions</TableHeaderColumn>
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
