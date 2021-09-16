
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import classes from './DishCard.module.scss'

const DishCard = ({ name, image, description, price, clicked, onAddDishToOrder }: any) => {
	return (
		<Card
			elevation={2}
			onClick={clicked}
			className={classes.DishCard}>
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image={image}
					title={name}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}

export default DishCard
