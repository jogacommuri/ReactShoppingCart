"use strict"

import {combineReducers} from 'redux';

//Import books reducers
import {booksReducers} from './booksReducers';
//Import cart reducers
import {cartReducers} from './cartReducers';
//Combine the Reducers
export default combineReducers({
	books: booksReducers,
	cart: cartReducers
})