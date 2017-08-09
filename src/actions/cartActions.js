"use strict"

//Add to cart
export function addToCart(book){
	return {
		type:"ADD_TO_CART", 
		payload: book
	}
}

//update cartItem
export function updateCart(_id,unit){
	return {
		type:"UPDATE_CART", 
		_id: _id,
		unit: unit
	}
}

//Delete cart Item
export function deleteCartItem(cart){
	return {
		type:"DELETE_CART_iTEM", 
		payload: cart
	}
}