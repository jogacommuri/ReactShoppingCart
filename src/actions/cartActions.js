"use strict"

//Add to cart
export function addToCart(book){
	return {
		type:"ADD_TO_CART", 
		payload: book
	}
}

//Delete cart Item
export function deleteCartItem(cart){
	return {
		type:"DELETE_CART_iTEM", 
		payload: cart
	}
}