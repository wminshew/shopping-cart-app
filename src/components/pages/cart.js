"use strict"
import React from 'react';
import {Panel, Row, Col, Label, ButtonGroup, Button} from 'react-bootstrap';
import {connect} from 'react-redux';

class Cart extends React.Component {
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
									qty. <Label bsStyle="success"></Label>
								</h6>
							</Col>
							<Col xs={6} sm={4}>
								<ButtonGroup style={{minWidth:'300px'}}>
									<Button bsStyle="default" bsSize="small">-</Button>
									<Button bsStyle="default" bsSize="small">+</Button>
									<span>     </span>
									<Button bsStyle="danger" bsSize="small">DELETE</Button>
								</ButtonGroup>
							</Col>
						</Row>
					</Panel>
				)
			})
			return (
				<Panel header='Cart' bsStyle='primary'>
					{cartItems}
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
		cart: state.cart.cart
	}
}

export default connect(mapStateToProps)(Cart);
