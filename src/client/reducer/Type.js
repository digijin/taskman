
import Type from '../../Type';

export default function type(state = [], action){

	state = [
		new Type({name:'state', dataFields: {name: 'string'}}),
		new Type({name:'task', dataFields: {
				name: 'string',
				description: 'string'
			},
			attributeFields:{
				state: {}
			}})
	]

	switch(action.type){
		case 'LOAD':
			state = action.data.type.map(i => {return new Type(i)})
		break;
	}

	return state;
}