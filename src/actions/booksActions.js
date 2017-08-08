"use strict"

//post book
export function postBooks(book){
	return {
		type:"POST_BOOK", 
		payload: book
	}
}

//Delete Book

export function deleteBooks(id){
	return {
		type:"DELETE_BOOK", 
		payload: id
	}
}

//Update Book
export function updateBooks(book){
	return {
		type:"UPDATE_BOOK",
		payload: book
	}
}
