import { Button, Modal, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { loadFullDish } from '../../store/actions';
import classes from './DetailProduct.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { ADD_PRODUCT, CartProduct } from '../../store/types/cartTypes';



const DetailProduct = ({ dish, onLoadDish, onAddProduct }: any) => {

	const { id } = useParams<any>();
	const [quantity, setQuantity] = useState<number>(0);

	if (!dish.name) {
		onLoadDish(id)
	}

	const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

	const addToCartHandler = (): void => {

		const { id, name, price, CategoryId } = dish;

		const product: CartProduct = {
			id,
			CategoryId,
			name,
			price,
			quantity
		}
		onAddProduct(product)
		setIsPurchasing(false)
	}


	return (
		<div className={classes.DetailProduct}>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.Modal}
				open={isPurchasing}
				onClose={() => setIsPurchasing(prev => !prev)}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={isPurchasing}>
					<div className={classes.Paper}>
						<h2 id="transition-modal-title">{dish.name}</h2>
						<section>
							<p id="transition-modal-description">How many do you want? </p>
							<TextField
								onChange={e => setQuantity(+e.target.value)}
								value={quantity}
								id="quantity"
								label="Outlined"
								variant="outlined" />
						</section>
						<p>*Hot offer! Get 10% off each main and drink combo.*</p>
						<p>*Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00.*</p>
						<Button
							onClick={addToCartHandler}
							variant="contained"
							color="primary">Add to cart!</Button>
					</div>
				</Fade>
			</Modal>
			<section className={classes.Header}>
				<span
					style={{ backgroundImage: `url(${dish.image_url})` }}
					className={classes.Image}>
				</span>
				<section className={classes.Price}>
					<h1>{dish.name}</h1>
					<h2>{dish.price}</h2>
				</section>
			</section>
			<section>
				<p>{dish.description}</p>
			</section>
			<Button
				onClick={() => setIsPurchasing(true)}
				variant="contained"
				color="primary">Buy now</Button>
		</div>
	)
}


const mapStateToProps = (state: any) => ({
	dish: state.category.detailDish
})

const mapDispatchToProps = (dispatch: any) => ({
	onLoadDish: (id: number) => dispatch(loadFullDish(id)),
	onAddProduct: (product: CartProduct) => dispatch({ type: ADD_PRODUCT, payload: { product: product } })
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
