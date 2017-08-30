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

export const deleteBook = (book) => {
	return {
		type: "DELETE_BOOK",
		payload: book
	}
}

export const updateBook = (book) => {
	return {
		type: "UPDATE_BOOK",
		payload: book
	}
}
