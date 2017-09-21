"use strict"
import axios from 'axios';

export const getBooks = (books) => {
	return (
		(dispatch) => {
			axios.get("/books", books)
				.then( (response) => {
					dispatch({
						type: "GET_BOOKS",
						payload: response.data
					})
				} )
				.catch( (err) => {
					dispatch({
						type: "GET_BOOKS_REJECTED",
						payload: err
					})
				} )
		}
	)
}

export const postBooks = (books) => {
	return (
		(dispatch) => {
		axios.post("/books", books)
			.then( (response) => {
				dispatch({
					type: "POST_BOOKS",
					payload: response.data
				})
			})
			.catch( (err) => {
				dispatch({
					type: "POST_BOOKS_REJECTED",
					payload: err
				})
			})
		}
	)
}

export const deleteBook = (_id) => {
	return (
		(dispatch) => {
			axios.delete("/books/" + _id)
				.then((response)=>{dispatch({type:"DELETE_BOOK",payload:_id})})
				.catch((err)=>{dispatch({type:"DELETE_BOOK_REJECTED",payload:err})})
		}
	)
}

export const updateBook = (book) => {
	return {
		type: "UPDATE_BOOK",
		payload: book._id
	}
}
