
import Item from 'Item'

export default function itemReducer(state = [], action){

	if(state.length == 0){
		state = [
			new Item({id: 'PRIORITY', type:'state', name:'prioritised'}),
			new Item({id: 'DEV', type:'state', name:'in dev'}),
			new Item({id: 'DONE', type:'state', name:'done'}),
		]
	}
	switch(action.type){
		case 'LOAD':
			state = action.data.item.map(i => {return new Item(i)})
		break;
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