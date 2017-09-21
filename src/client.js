"use strict"
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// import reducers
import reducers from './reducers/index.js';

// import actions
import {addToCart} from './actions/cartActions.js';
import {postBooks, deleteBook, updateBook} from './actions/bookActions.js';

// import react components
import BooksList from './components/pages/booksList.js';
import Cart from './components/pages/cart.js';
import BookForm from './components/pages/bookForm.js';
import Main from './components/main.js';

// create store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={BooksList} />
				<Route path="/admin" component={BookForm} />
				<Route path="/cart" component={Cart} />
			</Route>
		</Router>
	</Provider>
);

ReactDOM.render(Routes,
	document.getElementById('app')
);

// dispatch actions
//
// post book(s)
// store.dispatch(postBooks(
// 	[
// 		{
// 			id: 1,
// 			title: 'title',
// 			description: 'this is the book description',
// 			price: 33.33
// 		},
// 		{
// 			id: 2,
// 			title: 'second title',
// 			description: 'this is the second book description',
// 			price: 50
// 		}
// 	]
// ))
// store.dispatch(postBooks(
// 	[
// 		{
// 			id: 3,
// 			title: 'title',
// 			description: 'this is the book description',
// 			price: 10
// 		}
// 	]
// ))
//
// // delete book
// store.dispatch(deleteBook(
// 	{
// 		id:2
// 	}
// ))
//
// // update book
// store.dispatch(updateBook(
// 	{
// 		id:1,
// 		title: 'brand new title'
// 	}
// ))
//
// // add book to cart
// store.dispatch(addToCart(
// 	{
// 		id:3
// 	}
// ))
