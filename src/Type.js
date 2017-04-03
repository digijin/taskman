// @flow

export default class Type{
	id: number;
	name: string;
	dataFields: {};
	attributeFields: {};

	constructor(params){
		Object.keys(params).forEach(k => {
			this[k] = params[k]
		});
		if(!this.id) this.id = this.name; //and then never change it;
		if(!this.dataFields) this.dataFields = {}
		if(!this.attributeFields) this.attributeFields = {}
	}

	getId():string{
		return this.id
	}
	getName():string{
		return this.name
	}
	getDataFields():Array<string>{
		return Object.keys(this.dataFields)
	}
	getAttributeFields():Array<string>{
		return Object.keys(this.attributeFields)
	}

}