import React from 'react';
import Spinner from '../../components/Spinner/Spinner';
import classes from './Home.module.scss'

const Home = (props: any) => {
	return (
		<div className={classes.Home}>
			<Spinner />
		</div>
	)
}

export default Home
