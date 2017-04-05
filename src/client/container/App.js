// @flow
import React from 'react'

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import Nav from './Nav'
import TypeIndex from '../Type/Index'
import ItemIndex from '../Item/Index'
import ItemEdit from '../Item/Edit'
import Board from './Board'
import HomePage from '../HomePage'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class App extends React.Component {
	render() {
		return <div>
				<Router>
					<div>
						<Nav />
						<Route path="/" exact={true} component={HomePage} />
						<Route path="/type" component={TypeIndex} />
						<Route path="/item" exact={true} component={ItemIndex} />
						<Route path="/item/edit/:id" component={ItemEdit} />
						<Route path="/board/:type/:column" component={Board} />
					</div>
				</Router>
			</div>
	}
}
export default DragDropContext(HTML5Backend)(App)