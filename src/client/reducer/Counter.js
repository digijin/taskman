

export default function counterReducer(state=1, action){
    switch(action.type){
        case 'ADD_ITEM':
            state = state + 1
            break;
    }
    return state
}