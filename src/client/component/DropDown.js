import React from 'react';

export default class DropDown extends React.Component {
	render() {

		let options = this.props.options.map(o => {
			return <li 
				onClick={() => {this.props.onChange(o.value)}} 
				key={o.value}><a href="#">{o.label}</a></li>
		})
		return <div className="dropdown">
			<button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				{this.props.selected}
				<span className="caret"></span>
			</button>
			<ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				{options}
			</ul>
		</div>
	}
}