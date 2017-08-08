"use strict"

import React, {Component} from 'react';
import {Well, Panel, Col, Row, Button} from 'react-bootstrap';
import {connect} from 'react-redux';


class Cart extends Component{
	render(){
		if(this.props.cart[0]){
			return this.renderCart();;
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
				<Panel key={cartArr.id} bsStyle="primary">
					<Row>
						<Col xs={12} sm={4} md={4} lg={4}>
							<h6>{cartArr.title}</h6>
						</Col>
					</Row>
				</Panel>
			)
		})
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

export default connect(mapStateToProps)(Cart);