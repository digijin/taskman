// @flow

import item from './reducer/Item'
import type from './reducer/Type'

import { combineReducers } from 'redux';

export default combineReducers({
	item,
	type
})