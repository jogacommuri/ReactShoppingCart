"use strict"

//Cart Reducers

export function cartReducers(state={cart:[]},action){
	switch(action.type){
		case "ADD_TO_CART":
		return {...state, 
				cart:action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			}
		break;
		case "UPDATE_CART":
		//create a copy of the current array of cart
		const currentCartItemToUpdate = [...state.cart]
		//Determine at which index in cart array is the book to be updated
		const indexToUpdate = currentCartItemToUpdate.findIndex(
			function(cart){
				return cart._id === action._id;
			}
		)
		const newCartItemToUpdate = {
			...currentCartItemToUpdate[indexToUpdate],
			quantity: currentCartItemToUpdate[indexToUpdate].quantity + action.unit
		}
		
		let cartUpdate = [...currentCartItemToUpdate.slice(0,indexToUpdate),newCartItemToUpdate,...currentCartItemToUpdate.slice(indexToUpdate +1)]
		return {...state, 
				cart: cartUpdate,
				totalAmount: totals(cartUpdate).amount,
				totalQty: totals(cartUpdate).qty
		}
		break;
		case "DELETE_CART_iTEM":
		return {...state, 
				cart:action.payload,
				totalAmount: totals(action.payload).amount,
				totalQty: totals(action.payload).qty
			}
		break;
	}
	return state
}


//Calculate Totals

export function totals(payloadArr){
	const totalAmount = payloadArr.map(function(cartArr){
		return cartArr.price * cartArr.quantity;
	}).reduce(function(a,b){
		return a + b;
	},0)//start summing form index 0

	const totalQty = payloadArr.map(function(qty){
		return qty.quantity;
	}).reduce(function(a,b){
		return a + b;
	},0)

	return {amount: totalAmount.toFixed(2), qty: totalQty};
}