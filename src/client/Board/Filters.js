import React from 'react';
import { connect } from 'react-redux';
import type Type from 'Type'

import {TextField} from 'material-ui'
import {RaisedButton, FlatButton} from 'material-ui'
import {List, ListItem} from 'material-ui/List'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Toggle from 'material-ui/Toggle';

import ActionDelete from 'material-ui/svg-icons/action/delete';

import Select from 'react-select'

type Props = {
    type: Type
}

class Filters extends React.Component{
    props:Props

    constructor(props){
        super(props);
        let filters = localStorage.getItem('filters')
        if(filters){
            filters = JSON.parse(filters);
        }else{
            filters = [];
        }
        this.state = {newFilter:"", filters:filters}
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
            let newFilters = [this.state.newFilter, ...this.state.filters]
            this.setState({
                filters:newFilters, 
                newFilter:""})
            this.props.onChange(newFilters)
            localStorage.setItem('filters', JSON.stringify(newFilters))
        }
    }
    deleteFilter = (index) => {
        this.state.filters.splice(index, 1);
        this.setState(this.state);
        this.props.onChange(this.state.filters)
        localStorage.setItem('filters', JSON.stringify(this.state.filters))

    }

    render(){

        let fieldOptions = this.props.type.getAttributeFields().map(o =>{
            return {value: o, label: o}
        })
        let operatorOptions = ['=', '!='].map(o => {return {value: o, label: o}})
        
        // let filters = this.state.filters.map((f, i) => {
        //     return <ListItem key={i} primaryText={f} rightIcon={<ActionDelete />} />
        // })

        return <Card>
            <CardHeader title="Filters" 
                subtitle="hide unneeded items"
                actAsExpander={true}
                showExpandableButton={true} />
            <CardText expandable={true}>
                <TextField 
                value={this.state.newFilter}
                onChange={this.onNewFilterChange}
                floatingLabelText="Filter code"
                hintText="e.g. (item.state == 'DEV')"
                errorText={this.state.newFilterError}
                />
                <FlatButton label="Add" onClick={this.addNewFilter} 
                disabled={!!this.state.newFilterError}/>
                
                <Table selectable={false}>
                    <TableBody displayRowCheckbox={false} striped={true}>
                    {this.state.filters.map((f, i) => {
                        return <TableRow key={i}>
                            <TableRowColumn>{f}</TableRowColumn>
                            <TableRowColumn>
                                <Toggle label="" />
                            </TableRowColumn>
                            <TableRowColumn>
                                <FlatButton icon={<ActionDelete onClick={() =>{this.deleteFilter(i)}} />}/>
                            </TableRowColumn>
                        </TableRow>
                    })}
                    </TableBody>
                </Table>
            </CardText>
        </Card>

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
