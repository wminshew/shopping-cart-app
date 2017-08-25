"use strict"

import {combineReducers} from 'redux';

// import separate reducers to be combined
import {bookReducer} from './bookReducer.js';
import {cartReducer} from './cartReducer.js';

// combine these two reducers with voodoo magic
export default combineReducers({
	books: bookReducer,
	cart: cartReducer
})
