"use strict"

//Cart Reducers

export function cartReducers(state={cart:[]},action){
	switch(action.type){
		case "ADD_TO_CART":
		return {cart:[...state, ...action.payload]}
		break;
		case "DELETE_CART_iTEM":
		return {cart:[...state, ...action.payload]}
		break;
	}
	return state
}