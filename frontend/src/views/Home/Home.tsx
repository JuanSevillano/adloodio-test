import React, { useEffect, useState } from 'react';

import classes from './Home.module.scss'
import { makeStyles, useTheme } from '@material-ui/core';

import SwipeableViews from 'react-swipeable-views';

import { connect } from 'react-redux';

import { useHistory } from 'react-router';

import Spinner from '../../components/Spinner/Spinner';
import { loadFullCategory, loadFullDish } from '../../store/actions';
import { Dish } from '../../store/types/homeTypes';

const { autoPlay } = require('react-swipeable-views-utils');
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		overflow: 'visible',
		maxWidth: '100%',
		flexGrow: 1,
	}
}));


const Home = ({ dishes, categories, isLoading, onLoadFullCategory, onLoadFullDish }: any) => {


	const history = useHistory()
	const [activeStep, setActiveStep] = useState<number>(0)
	const theme = useTheme();
	const styles = useStyles();

	const handleStepChange = (index: number) => {
		setActiveStep(index)
	}

	const categoryHandler = (route: string) => {
		onLoadFullCategory(route)
		history.push(`/${route}`);
	}

	const detailDishHandler = (dishId: number) => {

		onLoadFullDish(dishId)
		history.push('/detail/' + dishId);
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className={classes.Home}>
			<div className={styles.root}>
				<AutoPlaySwipeableViews
					className={classes.Wrapper}
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={activeStep}
					onChangeIndex={handleStepChange}
					enableMouseEvents
					autoplay={false}>
					{
						dishes.map((dish: Dish, index: number) => (
							<div
								className={classes.Slide}
								key={dish.name}
								onClick={() => detailDishHandler(dish.id)}
								style={{
									backgroundImage: `url(${dish.image_url})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center'
								}}>

								<h2 className={classes.Name}>
									{
										dish.name.
											split('')
											.map((char: string, index: number) =>
												(index > 11 ? null : char))
									}...</h2>
							</div>
						))}
				</AutoPlaySwipeableViews>
			</div>
			<div className={classes.Categories}>
				{
					categories && categories.map((item: any) => (
						<div
							style={{
								backgroundImage: `url(${item.image_cover})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center'
							}}
							key={item.name}
							className={classes.Category}
							onClick={() => categoryHandler(item.name)}
						>
							<h2 className={classes.Title}>{item.name}</h2>
						</div>
					))
				}
			</div>
		</div >
	)
}

const mapStateToProps = (state: any) => ({
	dishes: state.home.dishes,
	categories: state.home.categories,
	isLoading: state.home.loading
})


const mapDispatchToProps = (dispatch: any) => ({
	onLoadFullCategory: (name: string) => dispatch(loadFullCategory(name)),
	onLoadFullDish: (id: number) => dispatch(loadFullDish(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
