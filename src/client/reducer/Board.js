// @flow
export default function boardState(state:Object = {}, action: Object){
	switch(action.type){
		case 'LOAD':
			if(action.data.board)
				state = action.data.board//.map(i => {return new Item(i)})
		break;
	}
	return state;
}