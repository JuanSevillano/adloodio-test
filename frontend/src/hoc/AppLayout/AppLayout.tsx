import {
	Container,
	Drawer,
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Modal,
	Snackbar,

} from '@material-ui/core';

import {
	Menu,
	ShoppingCartRounded,
} from '@material-ui/icons';

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { RouteI } from '../../app/App';
import { connect } from 'react-redux';
import { OrderCreated } from '../../store/types/cartTypes';

import classes from './AppLayout.module.scss'
import logo from '../../assets/logo.png'

interface LayoutI {
	routes: Array<RouteI>;
	children: any;
	orders?: OrderCreated[]
}

const AppLayout = ({ routes, children, orders }: LayoutI) => {


	const [notify, setNotify] = useState<boolean>(false);

	useEffect(() => {

		if (orders) {
			const filtered = orders.filter((order: OrderCreated) => order.status !== 0);
			if (filtered.length > 0 && !notify) {
				setNotify(true)
			}
		}

	}, [orders, notify])

	const history = useHistory()
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const menuHandler = (route: string) => {
		history.push(route)
	}

	const goToProfileHandler = (): void => {
		history.push('/profile')
	}

	const list = (
		<List className={classes.List}>
			{
				routes.map((route, index) => (
					<ListItem button onClick={() => menuHandler(route.route)} key={index}>
						{/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
						<ListItemText primary={route.label} />
					</ListItem>
				))
			}
		</List>
	)

	return (
		<div className={classes.AppLayout}>
			<Drawer onClick={() => setIsOpen(false)} className={classes.Drawer} anchor="left" open={isOpen} onClose={() => setIsOpen(prev => !prev)}>
				{list}
			</Drawer>
			<AppBar elevation={1} className={classes.Nav}  >
				<Toolbar className={classes.Toolbar}>
					<IconButton onClick={() => setIsOpen(prev => !prev)}>
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<img width="100px" src={logo} alt="AddFoodIo" />
					</Typography>
					<IconButton onClick={goToProfileHandler}>
						<ShoppingCartRounded />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Container className={classes.Container} >
				{children}
			</Container>

			<Snackbar
				open={notify}
				autoHideDuration={3000}
				onClose={() => setNotify(false)}
				message="Your order is done! You can pick it up :)"
			/>
		</div >
	)
}

const mapStateToProps = (state: any) => ({
	orders: state.cart.orders
})

export default connect(mapStateToProps, null)(AppLayout)
