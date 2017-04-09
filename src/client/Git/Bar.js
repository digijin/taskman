// @flow
import React from 'react';
import $ from 'jquery'
import CircularProgress from 'material-ui/CircularProgress';
import muiThemeable from 'material-ui/styles/muiThemeable';
import SvgIcon from 'material-ui/SvgIcon';
import CleanIcon from 'material-ui/svg-icons/file/cloud-done';
import DirtyIcon from 'material-ui/svg-icons/file/cloud-off';

class Clean extends React.Component{
	props:{
		isClean:boolean
	}
	render() {
		if(this.props.isClean){
			return <div>clean <CleanIcon /></div>
		}
		return <div>dirty <DirtyIcon /></div>
	}
}

class GitBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {loaded: false}
		setInterval(this.load, 5000)
		this.load();
	}
	render(){
		if(!this.state.loaded){
			return <div><CircularProgress size={20} thickness={7} />loading git data</div>
		}
		let clean = this.state.data.status.length == 0
		return <div style={{
			backgroundColor: this.props.muiTheme.palette.primary2Color,
			color: this.props.muiTheme.palette.textColor,
			padding: 10
		}} className="gitbar">
			<p>
			gitbar <Clean isClean={clean} />
			</p>
		</div>
	}
	// <pre>
	// 	{/*JSON.stringify(this.props.muiTheme, null, 2)*/}
	// 	{JSON.stringify(this.state, null, 2)}
	// </pre>
	load = () => {
		$.ajax( {
			type: 'GET',
			url: 'http://localhost:2468/git',
			success: (data)=>{
				// this.props.load(data)
				this.setState({loaded: true, data:data})
			},
			error: (err) => {
				throw new Error('Could not connect to server');
			}
		})
	}
}


export default muiThemeable()(GitBar);
// export default GitBar;