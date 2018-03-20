"use strict"

export const cartReducer = (state={ cart:[] }, action) => {
	switch(action.type) {
    case "GET_CART":
      return { ...state,
        cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQuantity: totals(action.payload).quantity
      }
      break;

		case "ADD_TO_CART":
			return { ...state,
				cart: action.payload,
				totalAmount: totals(action.payload).amount,
				totalQuantity: totals(action.payload).quantity
			};
			break;

		case "UPDATE_CART":
      return { ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity
      };
			break;

		case "DELETE_FROM_CART":
      return { ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQuantity: totals(action.payload).quantity
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
