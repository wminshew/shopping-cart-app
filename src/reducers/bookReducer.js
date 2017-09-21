"use strict"

export const bookReducer = (state={ books: [] }, action) => {
	switch(action.type) {
		case "GET_BOOKS":
			return { ...state, books:[...action.payload] };
			break;
		case "POST_BOOKS":
			return { books:[...state.books, ...action.payload] };
			break;
		case "DELETE_BOOK":
			const indexToDelete = state.books.findIndex( (book) => {
				return book._id.toString() === action.payload;
			} )
			return { books: [
				...state.books.slice(0, indexToDelete),
				...state.books.slice(indexToDelete+1)
			] };
			break;
		case "UPDATE_BOOK":
			const indexToUpdate = state.books.findIndex( (book) => {
				return book._id === action.payload;
			} )
			return { books: [
				...state.books.slice(0, indexToUpdate),
				{ ...state.books[indexToUpdate], title: action.payload.title },
				...state.books.slice(indexToUpdate+1)
			] };
			break;
			return {  };
			break;
	}
	return state;
}

