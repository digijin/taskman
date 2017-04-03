
import React from 'react'
import Card from '../component/Card'
export default class Column extends React.Component{
	render(){
		return <div className="well column">
					<Card />
					<Card />
					<Card />
				</div>
	}
}