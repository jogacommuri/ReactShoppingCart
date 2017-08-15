"use strict"

//React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//React Router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
//Import Combined Reducers
import reducers from './reducers/index';
//Import Actions
import {addToCart} from './actions/cartActions';


//step 3 define reducers


//step 1 create store
const middleware = applyMiddleware(thunk,logger);
//We will pass initial state from server store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);



import routes from './routes'
const Routes = (
	<Provider store={store}>
		{routes}
	</Provider>
)

render(
	Routes, document.getElementById('app')
);
