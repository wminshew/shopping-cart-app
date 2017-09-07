"use strict"

export const cartReducer = (state={ cart:[] }, action) => {
	switch(action.type) {
		case "ADD_TO_CART":
			let newCart = [...state.cart, ...action.payload];
			return {
				cart: newCart,
				totalAmount: totals(newCart).amount,
				totalQuantity: totals(newCart).quantity
			};
			break;
		case "UPDATE_CART":
			let indexToUpdate = state.cart.findIndex( (book) => {
				return book._id === action.payload._id;
			} )
			if(indexToUpdate === -1) {
				// book not found
				return { cart: [
					...state.cart
				] };
			} else {
				// book found
				let bookToUpdate = {
					...state.cart[indexToUpdate],
					quantity: state.cart[indexToUpdate].quantity + action.payload.unit
				}
				newCart = [
					...state.cart.slice(0, indexToUpdate),
					bookToUpdate,
					...state.cart.slice(indexToUpdate+1)
				]
				return { cart: newCart,
					totalAmount: totals(newCart).amount,
					totalQuantity: totals(newCart).quantity
				};
			}
			break;
		case "DELETE_FROM_CART":
			let indexToDelete = state.cart.findIndex( (book) => {
				return book._id === action.payload._id;
			} )
			newCart = [
				...state.cart.slice(0, indexToDelete),
				...state.cart.slice(indexToDelete+1)
			]
			return { cart: newCart,
				totalAmount: totals(newCart).amount,
				totalQuantity: totals(newCart).quantity
			};
			break;
		break;
	}
	return state;
}

export const totals = (cart) => {
	const totalAmount = cart.map( (item) => {
		return item.price * item.quantity;
	} ).reduce( (a, b) => {
		return a+b
	}, 0)
	const totalQuantity = cart.map( (item) => {
		return item.quantity;
	} ).reduce( (a, b) => {
		return a+b
	}, 0)

	return {
		amount: totalAmount.toFixed(2),
		quantity: totalQuantity
	}
}
