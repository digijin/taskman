// @flow

import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from './reducer'

import AppContainer from './container/App'

import Type from 'Type';
import Item from 'Item'

import $ from 'jquery'

import injectTapEventPlugin from 'react-tap-event-plugin';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import config from 'config'
import {merge} from 'lodash'

export default class App {
	container:HTMLDivElement;
	constructor(container){
		
		injectTapEventPlugin();

		this.container = container;
		let preloadedState = localStorage.getItem('state');
		// if(preloadedState){
		// 	let data = JSON.parse(preloadedState);
		// 	preloadedState = {
		// 		item: data.item.map(i => {return new Item(i)}),
		// 		type: data.type.map(i => {return new Type(i)}),
		// 	}
		// }else{
			preloadedState = {item:[], type:[]}
		// }
		//get store with localstorage data
		this.store = createStore(reducer, preloadedState);
		this.store.subscribe(this.render.bind(this))
		this.store.subscribe(this.save.bind(this))
		//then override store with server data
		// this.load();
		this.render();
	}
	render(){

		let theme = merge(darkBaseTheme, config.theme)

		ReactDOM.render(<Provider store={this.store}>
			<MuiThemeProvider muiTheme={getMuiTheme(theme)}><AppContainer /></MuiThemeProvider>
			</Provider>, this.container);
	}
	// load(){
	// 	$.ajax( {
	// 		type: 'GET',
	// 		url: 'http://localhost:2468/state',
	// 		success: (data)=>{
	// 			this.store.dispatch({type: 'LOAD', data: data})
	// 		},
	// 		error: (err) => {
	// 			console.log(err);
	// 		}
	// 	})
	// }
	save(){

		$.ajax( {
			type: 'PUT',
			url: 'http://localhost:2468/state',
			data: JSON.stringify(this.store.getState())
		})
		localStorage.setItem('state', JSON.stringify(this.store.getState()))
	}
}