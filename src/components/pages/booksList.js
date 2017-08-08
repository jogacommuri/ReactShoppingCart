"use strict"

import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getBooks} from '../../actions/booksActions';
import {Grid, Col, Row, Button} from 'react-bootstrap';

import BookItem from './bookItem';
import BooksForm from './bookForm';
import Cart from './cart';

class BooksList extends Component{
	componentDidMount(){
		//Diapatch an action
		this.props.getBooks(
			[{
				id: 1,
				title:'this is a book title',
				description: "this is a book description",
				price: 33.33
			},
			{
				id: 2,
				title:'this is a 2nd book title',
				description: "this is a 2nd book description",
				price: 99.99	
			},{
				id: 3,
				title:'this is a 3rd book title',
				description: "this is a 3rd book description",
				price: 55.55
			}]
		)
	}
	render(){
		const booksList = this.props.books.map(function(booksArr){
			return(
				<Col xs={12} sm={6} md={4} lg={4} key={booksArr.id}>
					<BookItem 
						id={booksArr.id}
						title={booksArr.title}
						description ={booksArr.description}
						price= {booksArr.price} />
				</Col>
			)
		})
		return(
			<Grid>
				<Row>
					<Cart />
				</Row>
				<Row> 
					<Col xs={12} sm={6} md={6} lg={6}>
						<BooksForm />
						
					</Col>
					{booksList}
				</Row>
			</Grid>
		)
	}
}

function mapStateToProps(state){
	return{
		books: state.books.books
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getBooks: getBooks
		}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);