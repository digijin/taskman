
import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';

import ItemMenu from '../Nav/ItemMenu'

class Nav extends React.Component {
	render() {
		return <nav className="navbar navbar-inverse navbar-fixed-top">
			<div className="container">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
					<a className="navbar-brand" href="#">CodePlan</a>
				</div>
				<div id="navbar" className="collapse navbar-collapse">
					<ul className="nav navbar-nav">
						<li><Link to={'/'}>Home</Link></li>
						<li>
							<ItemMenu />
						</li>

						<li><Link to={'/type'}>Types</Link></li>
						<li><Link to={'/item'}>Items</Link></li>
						{/*<li><Link to={'/board/task/state'}>Board</Link></li>*/}
						{this.props.boards.map(b => {
							return <li key={b.url}><Link to={'/board/'+b.url}>{b.name}</Link></li>
						})}
					</ul>
					
				</div>
				
			</div>
		</nav>
	}
}
function mapStateToProps(state: Object, props: Object): Object {
	return {
		// types: state.type,
		// items: state.item,
		boards: state.board
	};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		// change: (item) => {
		// 	dispatch({ type: 'CHANGE_ITEM', item: item });
		// }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
// export default Nav