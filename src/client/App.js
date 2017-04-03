// @flow

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducer'

import AppContainer from './container/App'

import Type from 'Type';
import Item from 'Item'

export default class App {
	container:HTMLDivElement;
	constructor(container){
		this.container = container;
		let preloadedState = localStorage.getItem('state');
		if(preloadedState){
			let data = JSON.parse(preloadedState);
			preloadedState = {
				item: data.item.map(i => {return new Item(i)}),
				type: data.type.map(i => {return new Type(i)}),
			}
		}
		this.store = createStore(reducer, preloadedState);
		this.store.subscribe(this.render.bind(this))
		this.store.subscribe(this.save.bind(this))
		this.render();
	}
	render(){
		ReactDOM.render(<Provider store={this.store}><AppContainer /></Provider>, this.container);
	}
	save(){
		localStorage.setItem('state', JSON.stringify(this.store.getState()))
	}
}