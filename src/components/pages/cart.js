"use strict"
import React from 'react';
import {Modal, Panel, Row, Col, Label, ButtonGroup, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateCart, deleteFromCart} from '../../actions/cartActions.js';

class Cart extends React.Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		}
	}
	open = () => {
		this.setState({
			showModal: true
		})
	}
	close = () => {
		this.setState({
			showModal: false
		})
	}
	updateCartQty = (_id, unit) => {
		if (unit < 0) {
			let bookIndex = this.props.cart.findIndex( (book) => {
				return _id === book._id
			} )
			if (this.props.cart[bookIndex].quantity === 1) {
				this.props.deleteFromCart(this.props.cart[bookIndex]);
			} else {
				this.props.updateCart(_id, unit);
			}
		} else {
			this.props.updateCart(_id, unit);
		}
	}

	deleteItem = (book) => {
		console.log(`Passing to deleteFromCart: ${book}`)
		this.props.deleteFromCart(book);
	}

	render = () => {
		if(this.props.cart[0]) {
			// cart is not empty
			const cartItems = this.props.cart.map((book) => {
				return (
					<Panel key={book._id}>
						<Row>
							<Col xs={12} sm={4}>
								<h6>
									{book.title}
								</h6>
								<span>    </span>
							</Col>
							<Col xs={12} sm={2}>
								<h6>
									usd. {book.price}
								</h6>
							</Col>
							<Col xs={12} sm={2}>
								<h6>
									qty. <Label bsStyle="success">{book.quantity}</Label>
								</h6>
							</Col>
							<Col xs={6} sm={4}>
								<ButtonGroup style={{minWidth:'300px'}}>
									<Button onClick={this.updateCartQty.bind(this,book._id,-1)} bsStyle="default" bsSize="small">-</Button>
									<Button onClick={this.updateCartQty.bind(this,book._id,1)} bsStyle="default" bsSize="small">+</Button>
									<span>     </span>
									<Button onClick={this.deleteItem.bind(this, book)} bsStyle="danger" bsSize="small">DELETE</Button>
								</ButtonGroup>
							</Col>
						</Row>
					</Panel>
				)
			})
			return (
				<Panel header='Cart' bsStyle='primary'>
					{cartItems}
					<Row>
						<Col xs={12}>
							<h6>Total amount: ${this.props.totalAmount}</h6>
							<Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
								Proceed to Checkout
							</Button>
						</Col>
					</Row>
					<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
						<Modal.Header closeButton>
							<Modal.Title>Thank you!</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h6>Your order has been saved</h6>
							<p>You will receive email confirmation</p>
						</Modal.Body>
						<Modal.Footer>
							<Col xs={6}>
								<h6>Total $:{this.props.totalAmount}</h6>
							</Col>
							<Button onClick={this.close.bind(this)}>Close</Button>
						</Modal.Footer>
					</Modal>
				</Panel>
			)
		} else {
			// cart is empty
			return (
				<div></div>
			)
		}
	}
}
const mapStateToProps = (state) => {
	return {
		cart: state.cart.cart,
		totalAmount: state.cart.totalAmount
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		updateCart: updateCart,
		deleteFromCart: deleteFromCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
