

import React from 'react'

export default class ItemAdd extends React.Component{
	render() {
		return <div>
			<form>
			<h3>Add Item</h3>
				<input type="text" placeholder="name" />

				<br />
				<input type="submit" />
			</form>
		</div>
	}
}