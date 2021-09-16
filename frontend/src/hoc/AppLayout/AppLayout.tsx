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

} from '@material-ui/core';

import {
	Menu,
	ShopOutlined,
} from '@material-ui/icons';


import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { RouteI } from '../../app/App';

import classes from './AppLayout.module.scss'

import logo from '../../assets/logo.png'

interface LayoutI {
	routes: Array<RouteI>;
	children: any;
}

const AppLayout = ({ routes, children }: LayoutI) => {


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
						<ShopOutlined />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Container className={classes.Container} >
				{children}
			</Container>
		</div>
	)
}

export default AppLayout
