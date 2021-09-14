
import { Box, Container, Drawer, Typography, BottomNavigation, BottomNavigationAction, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { FavoriteOutlined, Menu, Person, PersonOutlined, PlayCircleOutline } from '@material-ui/icons';
import React, { ComponentType } from 'react';
import Spinner from '../../components/Spinner/Spinner';

import classes from './AppLayout.module.scss'

interface LayoutI {
	routes: Array<Object>;
	children: any;
}

const AppLayout = ({ routes, children }: LayoutI) => {


	return (
		<div className={classes.AppLayout}>

			<AppBar className={classes.Nav} position="static" >
				<Toolbar className={classes.Toolbar}>
					<IconButton>
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
			<Container maxWidth="sm">
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
