"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/bookActions.js';

class BooksList extends React.Component {
	componentDidMount = () => {
		this.props.getBooks();
	}
	render = () => {
		const booksArr = this.props.books.map(
			(book) => {
				return (
					<div key={book.id}>
						<h2>{book.title}</h2>
						<h2>{book.description}</h2>
						<h2>{book.price}</h2>
					</div>
				)
			}
		)
		return (
			<div>
				<h1>Hello, React</h1>
				{booksArr}
			</div>
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
