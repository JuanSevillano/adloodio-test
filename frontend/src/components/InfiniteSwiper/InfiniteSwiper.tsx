
import React from 'react';

import classes from './InfiniteSwiper.module.scss'



const { AutoRotatingCarousel, Slide }: any = require('material-auto-rotating-carousel');

const InfiniteSwiper = (props: any) => {



	return (
		<div className={classes.InfiniteSwiper}>
			<AutoRotatingCarousel
				label='Get started'
				open={true}
				onClose={() => console.log('se cierra')}
				onStart={() => console.log('inicia')}
				autoplay={false}
				style={{ position: 'absolute' }}
			>
				<Slide
					media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}
					mediaBackgroundStyle={{ backgroundColor: '#bebebe' }}
					style={{ backgroundColor: '#bababa' }}
					title='1 This is a very cool feature'
					subtitle='Just using this will blow your mind.'
				/>
			</AutoRotatingCarousel>
		</div>
	)
}

export default InfiniteSwiper
