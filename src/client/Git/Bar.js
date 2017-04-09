
import React from 'react';
import $ from 'jquery'
import CircularProgress from 'material-ui/CircularProgress';


class GitBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {loaded: false}
		this.load();
	}
	render(){
		if(!this.state.loaded){
			return <div><CircularProgress size={20} thickness={7} />loading git data</div>
		}
		return <div>gitbar</div>
	}
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


export default GitBar;