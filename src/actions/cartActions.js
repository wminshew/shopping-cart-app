"use strict"

export const addToCart = (book) => {
	return {
		type: "ADD_TO_CART",
		payload: book
	}
}
export const updateCart = (_id, unit) => {
	return {
		type: "UPDATE_CART",
		payload: {
			_id: _id,
			unit: unit
		}
	}
}
export const deleteFromCart = (book) => {
	return {
		type: "DELETE_FROM_CART",
		payload: book
	}
}
