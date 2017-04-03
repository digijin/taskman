
import Type from '../../Type';

export default function type(state = [], action){

	state = [
		new Type('state', {name: 'string'}),
		new Type('task', {
				name: 'string',
				description: 'string'
			},
			{
				state: {}
			})
	]

	return state;
}