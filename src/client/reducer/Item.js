
import Item from 'Item'

export default function itemReducer(state = [], action){

	if(state.length == 0){
		state = [
			new Item({type:'state', name:'prioritised'}),
			new Item({type:'state', name:'in dev'}),
			new Item({type:'state', name:'done'}),
		]
	}
	switch(action.type){
		case 'ADD_ITEM': 
			let item = new Item(action.item);
			state = [...state, item]
		break;
		case 'UPDATE_ITEM':
			state = state.map(i => {
				if(i.getId() == action.id){
					i[action.field] = action.value;
				}
				return i
			})
		break;
	}

	return state;
}