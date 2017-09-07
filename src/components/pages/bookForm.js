"use strict"

import React from 'react';
import {Well, Panel, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBook} from '../../actions/bookActions.js';

class BookForm extends React.Component {
	handleSubmit = () => {
		const book = [{
			title: findDOMNode(this.refs.title).value,
			description: findDOMNode(this.refs.description).value,
			price: findDOMNode(this.refs.price).value
		}]
		this.props.postBooks(book);
	}

	deleteBook = () => {
		this.props.deleteBook(findDOMNode(this.refs.deleteID).value);
	}

	render = () => {
		const currBookIDs = this.props.books.map( (book) => {
			return (
				<option key={book._id}>{book._id}</option>
			)
		} )
		return (
			<Well>
				<Panel>
					<FormGroup controlId='title'>
						<ControlLabel>Title</ControlLabel>
						<FormControl
							type='text'
							placeholder='Enter Title'
							ref='title' />
					</FormGroup>
					<FormGroup controlId='description'>
						<ControlLabel>Description</ControlLabel>
						<FormControl
							type='text'
							placeholder='Enter Description'
							ref='description' />
					</FormGroup>
					<FormGroup controlId='price'>
						<ControlLabel>Price</ControlLabel>
						<FormControl
							type='text'
							placeholder='Enter Price'
							ref='price' />
					</FormGroup>
					<Button onClick={this.handleSubmit.bind(this)} bsStyle='primary'>Save Book</Button>
				</Panel>
				<Panel>
					<FormGroup controlId="formControlsSelect">
						<ControlLabel>Select</ControlLabel>
						<FormControl ref='deleteID' componentClass="select" placeholder="select">
							<option value="select">select</option>
							{currBookIDs}
						</FormControl>
					</FormGroup>
					<Button onClick={this.deleteBook.bind(this)} bsStyle="danger">Delete Book</Button>
				</Panel>
			</Well>
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
		postBooks:postBooks,
		deleteBook:deleteBook
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
