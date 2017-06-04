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
import $ from 'jquery'
import {flow} from 'lodash';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import GitBar from '../Git/Bar';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import config from 'config'

import {extend} from 'lodash';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

//TODO: rename this to router

class App extends React.Component {
	loadConfig = () => {
		// this.setState({loadMessage: 'Loading Config'})
		$.ajax( {
			type: 'GET',
			url: 'http://localhost:2468/config',
			success: (data)=>{
				if(data.error){
					this.showError(JSON.stringify(data));
					setTimeout(this.loadConfig, 3000);
					return;
				}
				let module = {} //maybe unnecessary
				let configObj = eval(data.config);
				this.props.loadConfig(configObj)
				this.setState({loaded:true})
				extend(config, configObj)
				this.loadState();
			},
			error: (err) => {
				this.showError('Could not connect to server. Retrying.');
				setTimeout(this.loadConfig, 3000)
			}
		})
	}
	constructor(props){
		super(props);
		this.state = {error: {open: false, message: ''}, loaded: false, loadMessage: 'Loading Config'}
		this.loadConfig();
		// this.loadState();
	}
	loadState = () => {
		this.setState({loadMessage: 'Loading State'})
		$.ajax( {
			type: 'GET',
			url: 'http://localhost:2468/state',
			success: (data)=>{
				// this.store.dispatch({type: 'LOAD', data: data})
				this.props.loadState(data)
			},
			error: (err) => {
				this.showError('Could not connect to server. Retrying.');
				setTimeout(this.loadState, 3000)
			}
		})
	}
	showError = (message) => {
		this.setState({error:{open: true, message: message}})

	}
	hideError = (e) => {
		this.setState({error:{open: false}})
	}
	render() {
		if(!this.state.loaded){
			return <Paper style={{textAlign: 'center', padding: 40}}>
			<h1>CodePlan</h1>
			<CircularProgress size={50} thickness={7} />
			<br />
			{this.state.loadMessage}
			<div style={{color:'red'}}>{this.state.error.message}</div>
			</Paper>
		}
		return <div>
				<Router>
					<div>
						<Nav />
						{/*JSON.stringify(this.state)*/}
						<Route path="/" exact={true} component={HomePage} />
						<Route path="/type" component={TypeIndex} />
						<Route path="/item" exact={true} component={ItemIndex} />
						<Route path="/item/edit/:id" component={ItemEdit} />
						<Route path="/board/:type/:column" component={Board} />
						<Route path="/board/:id" exact={true} component={Board} />
						<Snackbar
							open={this.state.error.open}
							message={this.state.error.message}
							autoHideDuration={3000}
							bodyStyle={{"backgroundColor": "#ffbaba"}}
							onRequestClose={this.hideError}
							/>
					</div>
				</Router>
			</div>
	}
}
// export default DragDropContext(HTML5Backend)(App)

function mapStateToProps(state: Object, props: Object): Object {
	return {};
}

function mapDispatchToProps(dispatch: Function, props: Object): Object {
	return {
		loadState: (data) => {
			//check

			// console.log('loading', data)


			dispatch({type: 'LOAD', data: data})
		},
		loadConfig: (data) => {
			
			
			dispatch({type: 'LOAD', data: data})
		}
	};
}

export default flow(
	DragDropContext(HTML5Backend),
	connect(mapStateToProps, mapDispatchToProps)
)(App)