// @flow

import id from 'Util/id'

import {find} from 'lodash'


import config from 'config'

export default class Item{
	//an item has all attributes
	//unless limited in mvp2
	id:number;
	type: string;
	parent:number;
	data: Object;
	attributes: Object;

	constructor(params){
		Object.keys(params).forEach(k => {
			this[k] = params[k]
		});
		if(!this.id) this.id = id();
	}
	getId():string{
		return this.id;
	}
	getName():string{
		return this.name || 'unnamed'
	}
	getType():string{
		return this.type
	}
	getTypeConfig(){
		return find(config.type, (o) => {
			return this.getType() == o.id;
		});
	}
	setAttribute(field, value){
		// console.log('set attribute', config);
		let type = this.getTypeConfig();
		console.log(type);
		debugger;
		this[field] = value;
	}
	
}