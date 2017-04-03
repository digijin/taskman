// @flow

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducer'

import AppContainer from './container/App'

export default class App {
	container:HTMLDivElement;
	constructor(container){
		this.container = container;
		this.store = createStore(reducer, this.state);
		this.store.subscribe(this.render.bind(this))
		this.render();
	}
	render(){
		ReactDOM.render(<Provider store={this.store}><AppContainer /></Provider>, this.container);
	}
}