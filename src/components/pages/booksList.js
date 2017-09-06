"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/bookActions.js';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import BookItem from './bookItem.js';
import BookForm from './bookForm.js';
import Cart from './cart.js';

class BooksList extends React.Component {
	componentDidMount = () => {
		this.props.getBooks();
	}
	render = () => {
		const booksArr = this.props.books.map(
			(book) => {
				return (
					<Col xs={12} sm={6} md={4} key={book._id}>
						<BookItem 
							_id={book._id}
							title={book.title}
							description={book.description}
							price={book.price}
						/>
					</Col>
				)
			}
		)
		return (
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row>
					<Col xs={12} sm={6}>
						<BookForm />
					</Col>
					{booksArr}
				</Row>
			</Grid>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		books: state.books.books
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getBooks: getBooks
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
