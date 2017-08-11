"use strict"
import axios from 'axios';

//GET CART
export function getCart(){
	return function(dispatch){
		axios.get('/api/cart')
			.then(function(response){
				dispatch({type:"GET_CART", payload: response.data})
			})
			.catch(function(err){
				dispatch({type:"GET_CART_REJECTED", msg:"Error while getting cart data"})
			})
	}
}
//Add to cart
export function addToCart(cart){
	return function(dispatch){
		axios.post('/api/cart',cart)
			.then(function(response){
				dispatch({type:"ADD_TO_CART",payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"ADD_TO_CART_REJECTED", msg:"Error while adding to the Cart"})
			})
	}
}

//update cartItem
export function updateCart(_id,unit, cart){
	//create a copy of the current array of cart
		const currentCartItemToUpdate = cart
		//Determine at which index in cart array is the book to be updated
		const indexToUpdate = currentCartItemToUpdate.findIndex(
			function(cart){
				return cart._id === _id;
			}
		)
		const newCartItemToUpdate = {
			...currentCartItemToUpdate[indexToUpdate],
			quantity: currentCartItemToUpdate[indexToUpdate].quantity + unit
		}
		
		let cartUpdate = [...currentCartItemToUpdate.slice(0,indexToUpdate),newCartItemToUpdate,...currentCartItemToUpdate.slice(indexToUpdate +1)]

		return function(dispatch){
		axios.post('/api/cart',cartUpdate)
			.then(function(response){
				dispatch({type:"UPDATE_CART",payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"UPDATE_CART_REJECTED", msg:"Error while updating the Cart"})
			})
	}
}

//Delete cart Item
export function deleteCartItem(cart){
	return function(dispatch){
		axios.post('/api/cart',cart)
			.then(function(response){
				dispatch({type:"DELETE_CART_ITEM",payload:response.data})
			})
			.catch(function(err){
				dispatch({type:"DELETE_CART_ITEM_REJECTED", msg:"Error while deleting from the Cart"})
			})
	}
}