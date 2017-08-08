"use strict"

import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
//Import Combined Reducers
import reducers from './reducers/index';
//Import Actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';
//step 3 define reducers


//step 1 create store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

/*store.subscribe(function(){
	console.log('current state is: ', store.getState());
})*/

//step 2 create and dispatch actions
store.dispatch(postBooks(
	[{
				id: 1,
				title:'this is a book title',
				description: "this is a book description",
				price: 33.33
			},
			{
				id: 2,
				title:'this is a 2nd book title',
				description: "this is a 2nd book description",
				price: 99.99	
			},{
				id: 3,
				title:'this is a 3rd book title',
				description: "this is a 3rd book description",
				price: 55.55
			}]
))

//Delete a book

store.dispatch(deleteBooks({id:2}))

//UPDATE a book
store.dispatch(updateBooks(
	{
		id: 3,
		title: 'Learn React Redux'
	}
))

//Create actions for the cart

store.dispatch(addToCart([{id: 1}]))

