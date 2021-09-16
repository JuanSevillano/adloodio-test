
import { BottomNavigation, BottomNavigationAction, Button, Fade, IconButton } from '@material-ui/core';
import { DeleteOutlined, ShoppingCart, PlayCircleFilledOutlined, ShopOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { purchase } from '../../store/actions/';
import { CartProduct, Order, REMOVE_PRODUCT } from '../../store/types/cartTypes';
import classes from './Profile.module.scss'

const Profile = ({ cartItems, totalPrice, onDeleteItem, onPurchase }: any) => {


	const purchaseHandler = (): void => {
		const newOrder: Order = {
			userId: 1,
			dishes: cartItems,
			price: totalPrice
		}

		onPurchase(newOrder)

	}


	const prods = cartItems?.map((item: CartProduct) => (
		<div className={classes.Item}>
			<h3>
				{item.name}
			</h3>
			<p>
				{item.quantity} {item.price * item.quantity}
			</p>
			<IconButton onClick={() => onDeleteItem(item.id)} aria-label="delete">
				<DeleteOutlined />
			</IconButton>
		</div>
	))

	return (
		<div className={classes.Profile}>

			<section className={classes.List}>
				<div className={classes.TotalPrice}>
					<h2>Your current Order</h2>
					<h3>{totalPrice}</h3>
				</div>
				{prods}
			</section>
			<Button
				className={classes.CTA}
				onClick={purchaseHandler}
				variant="contained"
				color="primary">Order now!</Button>
		</div>
	)
}


const mapStateToProps = (state: any) => ({
	cartItems: state.cart.products,
	totalPrice: state.cart.totalPrice
})

const mapDispatchToProps = (dispatch: any) => ({
	onLoadOrders: () => dispatch({ type: 'LOAD_ORDERS', payload: { userId: 1 } }),
	onDeleteItem: (id: number) => dispatch({ type: REMOVE_PRODUCT, payload: { productId: id } }),
	onPurchase: (order: Order) => dispatch(purchase(order))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
