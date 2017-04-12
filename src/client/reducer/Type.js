
import Type from '../../Type';

export default function type(state = [], action){

	// state = [
	// 	new Type({name:'state', dataFields: 
	// 		{name: {type: 'string'}}
	// 	}),
	// 	new Type({name:'task', dataFields: {
	// 			name: {type:'string'},
	// 			description: {type:'text'},
	// 			storyPoints: {type:'number'}
	// 		},
	// 		attributeFields:{
	// 			state: {
	// 				multiple: false,
	// 				required: false
	// 			}
	// 		}})
	// ]

	switch(action.type){
		case 'LOAD':
			if(action.data.type)
				state = action.data.type.map(i => {return new Type(i)})
		break;
	}

	return state;
}