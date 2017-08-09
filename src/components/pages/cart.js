"use strict"

import React, {Component} from 'react';
import {Well, Panel, Col, Row, Button,ButtonGroup, Label, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem,updateCart} from '../../actions/cartActions';


class Cart extends Component{
	onDelete(_id){
		//create a copy of the current array of cart
		const currentCartItemToDelete = this.props.cart
		//Determine at which index in cart array is the cart item to be Deleted
		const indexToDelete = currentCartItemToDelete.findIndex(
			function(cart){
				return cart._id === _id;
			}
		)
		//use slice to remove the cart item at the specified index
		let cartAfterDelete = [...currentCartItemToDelete.slice(0,indexToDelete),...currentCartItemToDelete.slice(indexToDelete +1)]
		this.props.deleteCartItem(cartAfterDelete);
	}

	onIncrement(_id){
		this.props.updateCart(_id,1);
	}
	onDecrement(_id, quantity){

		if(quantity >1){
			this.props.updateCart(_id,-1);
		}
	}
	constructor(){
		super();
		this.state ={
			showModal: false
		}
	}
	open(){
		this.setState({showModal:true})
	}
	close(){
		this.setState({showModal:false})
	}

	render(){
		if(this.props.cart[0]){
			return this.renderCart();
		}else{
			return this.renderEmpty();
		}
	}
	renderEmpty(){
		return(<div></div>)
	}

	renderCart(){
		const cartItemList = this.props.cart.map(function(cartArr){
			return(
				<Panel key={cartArr._id} bsStyle="primary">
					<Row>
						<Col xs={12} sm={4} md={4} lg={4}>
							<h6>{cartArr.title}</h6><span>    </span>
						</Col>
						<Col xs={12} sm={2} md={2} lg={2}>
							<h6>$.{cartArr.price}</h6>
						</Col>
						<Col xs={12} sm={2} md={2} lg={2}>
							<h6>qty.<Label bsStyle="success"> {cartArr.quantity} </Label></h6>
						</Col>
						<Col xs={6} sm={4} md={4} lg={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button onClick={this.onDecrement.bind(this,cartArr._id,cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
								<Button onClick={this.onIncrement.bind(this,cartArr._id)} bsStyle="default" bsSize="small">+</Button>
								<span>     </span>
								<Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">Delete</Button>
							</ButtonGroup>
						</Col>
					</Row>
				</Panel>
			)
		}, this)
		return(
			<Panel header="Cart" bsStyle="primary">
				{cartItemList}
				<Row>
					<Col xs={12}>
						<h6> Total Amount: {this.props.totalAmount}</h6>
						<Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small"> Proceed To Checkout </Button>
					</Col>
				</Row>
				<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
		          <Modal.Header closeButton>
		            <Modal.Title>Thank you for shopping!!</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	<h6>Your order has been saved!!!</h6>
		          		<p> You will receive an email conformation</p>
		          </Modal.Body>
		          <Modal.Footer>
		          	<Col xs={6}>
		          		<h6> total $: {this.props.totalAmount}</h6>
		          	</Col>
		            <Button onClick={this.close.bind(this)}>Close</Button>
		          </Modal.Footer>
		        </Modal>
			</Panel>
		)
	}
}

function mapStateToProps(state){
	 return{
	 cart: state.cart.cart,
	 totalAmount: state.cart.totalAmount,
	 totalQty: state.cart.totalQty
	 }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		deleteCartItem: deleteCartItem,
		updateCart: updateCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);