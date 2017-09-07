"use strict"

export const getBooks = (books) => {
	return {
		type: "GET_BOOKS"
	}
}

export const postBooks = (books) => {
	return {
		type: "POST_BOOKS",
		payload: books
	}
}

export const deleteBook = (_id) => {
	return {
		type: "DELETE_BOOK",
		_id: _id
	}
}

export const updateBook = (book) => {
	return {
		type: "UPDATE_BOOK",
		payload: book
	}
}
