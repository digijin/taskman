
import React from 'react';
import Card from '../component/Card';
import { DropTarget } from 'react-dnd';

export default class Column extends React.Component{
	render(){
		return <div className="well column">
				<h3>{this.props.name}</h3>
				
					<Card />
					<Card />
					<Card />
				</div>
	}
}