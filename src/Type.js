

export default class Type{
	id: number;
	name: string;
	dataFields: {};
	attributeFields: {};

	constructor(name:string, dataFields = {}, attributeFields = {}){
		this.name = name;
		this.id = this.name; //and then never change it;
		this.dataFields = dataFields;
		this.attributeFields = attributeFields;
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