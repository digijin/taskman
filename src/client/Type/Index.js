
import React from 'react'
import List from './List'
import Add from './Add'
import Subheader from 'material-ui/Subheader';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
export default class TypeIndex extends React.Component{
	render() {
		return <div><AppBar
			title={<span>Types</span>}
		/>
			<List />
			
		</div>
	}
}