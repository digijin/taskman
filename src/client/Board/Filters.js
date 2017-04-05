import React from 'react';
import { connect } from 'react-redux';
import type Type from 'Type'

import {TextField} from 'material-ui'
import {RaisedButton, FlatButton} from 'material-ui'

import Select from 'react-select'

type Props = {
    type: Type
}

class Filters extends React.Component{
    props:Props

    constructor(props){
        super(props);
        this.state = {newFilter:"", filters:[]}
    }
        
    onNewFilterChange = (e) => {//bound function
        

        let item = this.props.type.mockItem();
        let code = e.target.value
        let result
        let errMessage
        if(code.length>0){
            try{
                result = eval(code)
            } catch (err) {
                // console.log(err)
                errMessage = err.message
            }
            if(!errMessage){
                if(result === undefined){
                    errMessage = 'return undefined'
                }else{
                    let resultType = typeof result
                    if(resultType !== 'boolean'){
                        errMessage = "expected boolean got "+resultType
                    }
                }
            }
        }
        
        this.setState({newFilter: code, newFilterError: errMessage})
    }

    addNewFilter = (e) => {
        
        if(this.state.newFilterError){
            return
        }else{
            this.setState({
                filters:[this.state.newFilter, ...this.state.filters], 
                newFilter:""})
        }
    }

    render(){
        // console.log('type', this.props.type, this.props.type.getAttributeFields());

        let fieldOptions = this.props.type.getAttributeFields().map(o =>{
            return {value: o, label: o}
        })
        let operatorOptions = ['=', '!='].map(o => {return {value: o, label: o}})
        
        return <div className="panel panel-default">
			<div className="panel-heading">filters</div>
			<div className="panel-body">
            <TextField 
            value={this.state.newFilter}
            onChange={this.onNewFilterChange}
            floatingLabelText="Filter code"
            hintText="e.g. (item.state == 'DEV')"
            errorText={this.state.newFilterError}
             />
            <FlatButton label="Add" onClick={this.addNewFilter} 
            disabled={!!this.state.newFilterError}/>

            </div>
        </div>
    }

}

function mapStateToProps(state:Object, props:Object):Object {
	return {
		types: state.type
	};
}

function mapDispatchToProps(dispatch:Function, props:Object):Object {
	return {
		close: () => {
			// dispatch({type:'CLOSE_CONTEXT_MENU'});
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
