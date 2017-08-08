"use strict"

import React, {Component} from 'react';
import {Well, Panel, Col, Row, Button,ButtonGroup, Label} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem} from '../../actions/cartActions';


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
							<h6>qty.<Label bsStyle="success"></Label></h6>
						</Col>
						<Col xs={6} sm={4} md={4} lg={4}>
							<ButtonGroup style={{minWidth:'300px'}}>
								<Button bsStyle="default" bsSize="small">-</Button>
								<Button bsStyle="default" bsSize="small">+</Button>
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
			</Panel>
		)
	}
}

function mapStateToProps(state){
	 return{
	 cart: state.cart.cart
	 }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		deleteCartItem: deleteCartItem
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);