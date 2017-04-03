

import React from 'react'

export default class TypeAdd extends React.Component{
	render() {
		return <div className="panel panel-default">
			<div className="panel-heading">Add Type</div>
			<input type="text" placeholder="name" />
			<div className="panel-heading">data fields</div>
			
			<br />
			<input type="submit" />
		</div>
	}
}