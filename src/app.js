"use strict"
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';

// import reducers
import reducers from './reducers/index.js';

// import actions
import {addToCart} from './actions/cartActions.js';
import {postBooks, deleteBook, updateBook} from './actions/bookActions.js';

// create store
const middleware = applyMiddleware(logger);
const store = createStore(reducers, middleware);

// add console outputs for testing
// store.subscribe(() => {
// 	// console.log(`The state of the store is ${store.getState()}`)
// 	console.log('The state of the store is ', store.getState())
// })

// dispatch actions
//
// post book(s)
store.dispatch(postBooks(
	[
		{
			id: 1,
			title: 'title',
			description: 'this is the book description',
			price: 33.33
		},
		{
			id: 2,
			title: 'title',
			description: 'this is the book description',
			price: 50
		}
	]
))
store.dispatch(postBooks(
	[
		{
			id: 3,
			title: 'title',
			description: 'this is the book description',
			price: 10
		}
	]
))

// delete book
store.dispatch(deleteBook(
	{
		id:2
	}
))

// update book
store.dispatch(updateBook(
	{
		id:1,
		title: 'brand new title'
	}
))

// add book to cart
store.dispatch(addToCart(
	{
		id:3
	}
))
