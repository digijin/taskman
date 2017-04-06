

export default function counterReducer(state=1, action){
    switch(action.type){
		case 'LOAD':
			if(action.data.counter)
				state = action.data.counter
		break;
        case 'ADD_ITEM':
            state = state + 1
            break;
    }
    return state
}