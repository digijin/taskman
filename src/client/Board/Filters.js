import React from 'react';
import { connect } from 'react-redux';
import type Type from 'Type'

import Select from 'react-select'

type Props = {
    type: Type
}

class Filters extends React.Component{

    props:Props
    render(){
        // console.log('type', this.props.type, this.props.type.getAttributeFields());

        let fieldOptions = this.props.type.getAttributeFields().map(o =>{
            return {value: o, label: o}
        })
        let operatorOptions = ['=', '!='].map(o => {return {value: o, label: o}})
        
        return <div className="panel panel-default">
			<div className="panel-heading">filters</div>
			<div className="panel-body">
            <div className="row">
                <div className="col-sm-3">
                    <Select name="fieldname"
                    options={fieldOptions}
                    />
                </div>
                <div className="col-sm-3">
                    <Select name="operator"
                    options={operatorOptions}
                    />
                </div>
                <div className="col-sm-3">
                    <input type="text"/>
                </div>
                <div className="col-sm-3">
                    <input class="btn btn-default" type="submit" value="add" />
                </div>
            </div>
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
