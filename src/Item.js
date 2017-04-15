// @flow

import id from 'Util/id'

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
	setAttribute(field, value){
		console.log('set attribute');
		
		this[field] = value;
	}
	
}