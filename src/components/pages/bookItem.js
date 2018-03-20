"use strict"

import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions.js';

class BookItem extends React.Component{
	handleSubmit = () => {
		const book = [{
			_id:this.props._id,
			title: this.props.title,
			description: this.props.description,
			price: this.props.price,
			quantity: 1
		}]
		// check if cart is empty
		if(this.props.cart.length === 0) {
			this.props.addToCart(book);
		} else {
			let _id = this.props._id;
			const bookIndex = this.props.cart.findIndex( (findBook) => {
				return findBook._id === _id
			} )
			if (bookIndex === -1) {
				// book index not in cart
				this.props.addToCart(book);
			} else {
				this.props.updateCart(_id, 1, this.props.cart)
			}
		}
	}

	render = () => {
		return (
			<Well>
				<Row>
					<Col xs={12}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description}</p>
						<h6> usd. {this.props.price}</h6>
						<Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Buy now</Button>
					</Col>
				</Row>
			</Well>
		)
	}
}
const mapStateToProps = (store) => {
	return {
		cart: store.cart.cart
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		addToCart: addToCart,
		updateCart: updateCart
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
