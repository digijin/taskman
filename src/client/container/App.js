// @flow
import React from 'react'

import Nav from './Nav'
import TypeIndex from '../Type/Index'

export default class App extends React.Component {
	render() {
		return <div>
				<Nav />
				<TypeIndex />
			</div>
	}
}