// @flow

import item from './reducer/Item'
import type from './reducer/Type'
import counter from './reducer/Counter'

import { combineReducers } from 'redux';

// export default combineReducers({
// 	item,
// 	type,
// 	// counter
// })

export default function reducer(state, action){
	return {
		item: item(state.item, action, state),
		type: type(state.type, action),
		counter: counter(state.counter,action)

	}
}