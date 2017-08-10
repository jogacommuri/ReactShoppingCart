"use strict"

//Books Reducers

export function booksReducers(state={
		books:[]
	}, action){
	switch(action.type){
		case "GET_BOOKS":
		return {...state, books:[...action.payload]};
		break;
		case "POST_BOOK":
		// let books = state.books.concat(action.payload);
		// return {books};
		return {books:[...state.books, ...action.payload]};
		break;

		case "DELETE_BOOK":
		//create a copy of the current array of books
		const currentBookToDelete = [...state.books]
		//Determine at which index in books array is the book to be Deleted
		const indexToDelete = currentBookToDelete.findIndex(
			function(book){
				return book._id.toString() === action.payload;
			}
		)
		//use slice to remove the books at the specified index
		return {books:
					[...currentBookToDelete.slice(0,indexToDelete),
					...currentBookToDelete.slice(indexToDelete +1)]}
 		break;

 		case "UPDATE_BOOK":
 		//create a copy of the current array of books
		const currentBookToUpdate = [...state.books]
		//Determine at which index in books array is the book to be updated
		const indexToUpdate = currentBookToUpdate.findIndex(
			function(book){
				return book._id === action.payload._id;
			}
		)
		const newBookToUpdate = {
			...currentBookToUpdate[indexToUpdate],
			title: action.payload.title
		}
		//use slice to update the books at the specified index
		return {books:
					[...currentBookToUpdate.slice(0,indexToUpdate),newBookToUpdate,
					...currentBookToUpdate.slice(indexToUpdate +1)]}
 		break;
	}
	return state
}