
import React from 'react'
import List from './List'
import Add from './Add'

export default class ItemIndex extends React.Component{
	render() {
		return <div>
			<List />
			<Add />
		</div>
	}
}