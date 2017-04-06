
import Item from 'Item'

export default function itemReducer(state = [], action, {counter}){

	if(state.length == 0){
		state = [
			new Item({id: 'PRIORITY', type:'state', name:'prioritised'}),
			new Item({id: 'DEV', type:'state', name:'in dev'}),
			new Item({id: 'DONE', type:'state', name:'done'}),
		]
	}
	switch(action.type){
		case 'LOAD':
			if(action.data.item)
				state = action.data.item.map(i => {return new Item(i)})
		break;
		case 'ADD_ITEM': 
			//make new ID
			let i = action.item
			i.id = i.type.toUpperCase()+'-'+counter;

			let item = new Item(i);
			state = [...state, item]
		break;
		case 'UPDATE_ITEM':
			
			state = state.map(i => {
				if(i.getId() == action.item.id){
					return new Item(action.item);
				}
				return i;
			})
		break;
		case 'UPDATE_ITEM_FIELD':
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