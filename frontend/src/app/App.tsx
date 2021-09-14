import React, { useEffect, lazy, ComponentType } from 'react';
import classes from './App.module.scss';
import axios from './axiosConfig';

import { AnimatedSwitch } from 'react-router-transition';
import AppLayout from '../hoc/AppLayout/AppLayout';
import { Route } from 'react-router';



const Home = lazy(() => import("../views/Home/Home"));
const Orders = lazy(() => import('../views/Orders/Orders'));
const DetailProduct = lazy(() => import('../views/DetailProduct/DetailProduct'));

export interface RouteI {
  route: string;
  label: string;
  view: ComponentType<any>
}


const routes: Array<RouteI> = new Array(
  {
    route: '/',
    label: 'Home',
    view: Home,
  },
  {
    route: '/orders',
    label: 'My Orders',
    view: Orders
  }
)


function App() {


  useEffect(() => {

    axios.get('http://localhost:4848/')
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

  }, [])

  return (
    <AppLayout routes={routes} >
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className={classes.Wrapper}>
        {
          routes.map(view => <Route
            key={view.route}
            exact
            path={view.route}
            component={view.view} />)
        }
      </AnimatedSwitch>
    </AppLayout>
  );
}

export default App;
