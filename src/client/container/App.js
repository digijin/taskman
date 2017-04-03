// @flow
import React from 'react'

import Nav from './Nav'
import TypeIndex from '../Type/Index'
import ItemIndex from '../Item/Index'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

export default class App extends React.Component {
	render() {
		return <div>
				<Router>
					<div>
						<Nav />
						<Route path="/type" component={TypeIndex} />
						<Route path="/item" component={ItemIndex} />
					</div>
				</Router>
			</div>
	}
}