import {
	Container,
	Drawer,
	Typography,
	AppBar,
	Toolbar,
	IconButton,
	List,
	ListItem,
	ListItemText
} from '@material-ui/core';

import {
	Menu,
	Person,
	PersonOutlined,
	PlayCircleOutline
} from '@material-ui/icons';


import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { RouteI } from '../../app/App';

import classes from './AppLayout.module.scss'

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
			<AppBar className={classes.Nav}  >
				<Toolbar className={classes.Toolbar}>
					<IconButton onClick={() => setIsOpen(prev => !prev)}>
						<Menu />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						News
					</Typography>
					<IconButton>
						<Person />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Container >
				{children}
				{/* <BottomNavigation
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				showLabels
				className={classes.root}
				>
				<BottomNavigationAction label="Profile" icon={<PersonOutlined />} />
				<BottomNavigationAction label="Menu" icon={<FavoriteOutlined />} />
				<BottomNavigationAction label="Orders" icon={<PlayCircleOutline />} />
			</BottomNavigation> */}
			</Container>
		</div>
	)
}

export default AppLayout
