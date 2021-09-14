
import React, { Component } from 'react';
import classes from './Spinner.module.scss';
import logo from '../../assets/logo.png';

const Spinner = () => {
	return (
		<div className={classes.Spinner} >
			<img src={logo} className={classes.Logo} alt="logo" />
		</div>
	)
};

export default Spinner
