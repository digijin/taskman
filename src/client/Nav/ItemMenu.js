import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { connect } from 'react-redux';

class ItemMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
		};
	}

	handleTouchTap = (event) => {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	};

	handleRequestClose = () => {
		this.setState({
			open: false,
		});
	};

	mouseover = (event) => {
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		});
	}

	render() {
		return (
			<div>
				<RaisedButton
					onMouseEnter={this.mouseover}
					onTouchTap={this.handleTouchTap}
					label="LIST"
				/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
				>
					<Menu>
						{this.props.types.map((t) => {
							return <MenuItem primaryText={t.name+'s'} />
						})}
					</Menu>
				</Popover>
			</div>
		);
	}
}

function mapStateToProps(state: Object, props: Object): Object {
	// console.log('state', state);
	
	return {
		types: state.type
	};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemMenu);