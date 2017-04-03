
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

	return state;
}