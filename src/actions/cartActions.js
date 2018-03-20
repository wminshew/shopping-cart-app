"use strict"
import axios from 'axios';

export const getCart = () => {
  return (
    (dispatch) => {
      axios.get("/api/cart")
        .then( (response) => {
          console.log(response.data);
          dispatch({
            type: "GET_CART",
            payload: response.data
          })
        } )
        .catch( (err) => {
          dispatch({
            type: "GET_CART_REJECTED",
            msg: "error getting cart"
          })
        } )
    }
  )
}

export const addToCart = (cart) => {
  return (
    (dispatch) => {
      axios.post("/api/cart", cart)
        .then( (response) => {
          dispatch({
            type: "ADD_TO_CART",
            payload: response.data
          })
        } )
        .catch( (err) => {
          dispatch({
            type: "ADD_TO_CART_REJECTED",
            msg: "error adding to cart"
          })
        } )
    }
  )
}

export const updateCart = (_id, unit, cart) => {
  const oldCart = cart;
  const indexToUpdate = oldCart.findIndex((book) => {
    return book._id === _id
  })

  const newBookToUpdate = {
    ...oldCart[indexToUpdate],
    quantity: oldCart[indexToUpdate].quantity + unit
  }

  let newCart = [...oldCart.slice(0, indexToUpdate), newBookToUpdate,
  ...oldCart.slice(indexToUpdate+1)]

  return (
    (dispatch) => {
      axios.post("/api/cart", newCart)
        .then( (response) => {
          dispatch({
            type: "UPDATE_CART",
            payload: response.data
          })
        } )
        .catch( (err) => {
          dispatch({
            type: "UPDATE_CART_REJECTED",
            msg: "error updating cart"
          })
        } )
    }
  )
}

export const deleteFromCart = (cart) => {
  return (
    (dispatch) => {
      axios.post("/api/cart", cart)
        .then( (response) => {
          dispatch({
            type: "DELETE_FROM_CART",
            payload: response.data
          })
        } )
        .catch( (err) => {
          dispatch({
            type: "DELETE_FROM_CART_REJECTED",
            msg: "error deleting from cart"
          })
        } )
    }
  )
}
