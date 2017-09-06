"use strict"

export const cartReducer = (state={ cart:[] }, action) => {
	switch(action.type) {
		case "ADD_TO_CART":
			return { cart:[...state.cart, ...action.payload] };
			break;
		case "DELETE_FROM_CART":
			const indexToDelete = state.cart.findIndex( (book) => {
				return book._id == action.payload._id;
			} )
			return { cart: [
				...state.cart.slice(0, indexToDelete),
				...state.cart.slice(indexToDelete+1)
			] };
			break;
		return { cart:[...state.cart, ...action.payload] };
		break;
	}
	return state;
}

