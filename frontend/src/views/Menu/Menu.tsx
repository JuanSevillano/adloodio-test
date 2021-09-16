import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import DishCard from '../../components/DishCard/DishCard';
import { loadFullCategory, loadFullDish } from '../../store/actions';
import { Dish } from '../../store/types/homeTypes';
import { formatUrl } from '../../utils/utility';
import classes from './Menu.module.scss'



const Menu = ({ dishes, onLoadFullCategory, onLoadFullDish }: any) => {


	const history = useHistory();
	const category = useLocation().pathname;

	if (dishes.length < 1) {
		onLoadFullCategory(category)
	}


	const loadDishHandler = (dishId: number, dishName: string): void => {

		// TODO : GET UNIQUTE PRODUCT 
		// CREATE ORDER 
		// RECIEVE NOTIFICATION POPUP 
		onLoadFullDish(dishId)
		const url = formatUrl(history.location.pathname + '/' + dishId)
		history.push(url);

	}

	return (
		<div className={classes.Menu}>

			{
				dishes.map((item: Dish) => (<>
					<DishCard
						key={item.name}
						clicked={() => loadDishHandler(item.id, item.name)}
						name={item.name}
						image={item.image_url}
						price={item.price}
						description={item.description}
					/>
				</>
				))
			}

		</div >
	)
}

const mapStateToProps = (state: any) => ({
	name: state.category.name,
	dishes: state.category.dishes
})


const mapDispatchToProps = (dispatch: any) => ({
	onLoadFullCategory: (name: string) => dispatch(loadFullCategory(name)),
	onLoadFullDish: (id: number) => dispatch(loadFullDish(id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Menu)
