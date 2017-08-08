"use strict"

import React, { Component } from 'react';
import {Well, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart} from '../../actions/cartActions';

class BookItem extends Component{
	handleCart(){
		const book = [...this.props.cart, {
			_id:this.props._id,
			title:this.props.title,
			description:this.props.description,
			price: this.props.price
		}]
		this.props.addToCart(book);
	}
	render(){
		return(
			<Well>
				<Row>
					<Col xs={12} sm={6} md={4} lg={4}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description}</p>
						<h4> $ {this.props.price}</h4>
						<Button onClick={this.handleCart.bind(this)} bsStyle="primary"> Buy Now </Button>
					</Col>
				</Row>
			</Well>
		)
	}
}

function mapStateToProps(state){

	return{
		cart:state.cart.cart
	}
}

function mapDispatchToProps(dispatch){
	 return bindActionCreators({
	 	addToCart: addToCart
	 }, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(BookItem);