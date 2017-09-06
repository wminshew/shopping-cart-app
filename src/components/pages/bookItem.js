"use strict"

import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../../actions/cartActions.js';

class BookItem extends React.Component{
	handleSubmit = () => {
		const book = [{
			_id:this.props._id,
			title: this.props.title,
			description: this.props.description,
			price: this.props.price
		}]
		this.props.addToCart(book);
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
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({addToCart}, dispatch);
}

export default connect(null, mapDispatchToProps)(BookItem);
