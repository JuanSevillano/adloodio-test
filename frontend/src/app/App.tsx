import React, { useEffect, lazy, ComponentType } from 'react';
import classes from './App.module.scss';

import { AnimatedSwitch } from 'react-router-transition';
import AppLayout from '../hoc/AppLayout/AppLayout';
import { Route } from 'react-router';
import { useDispatch } from 'react-redux';
import { loadHome } from '../store/actions';
import { LOAD_PREV_CART } from '../store/types/cartTypes';




const Home = lazy(() => import("../views/Home/Home"));
const Orders = lazy(() => import('../views/Orders/Orders'));
const Menu = lazy(() => import('../views/Menu/Menu'));
const DetailProduct = lazy(() => import('../views/DetailProduct/DetailProduct'));
const Profile = lazy(() => import('../views/Profile/Profile'));

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
    route: '/profile',
    label: 'My Profile',
    view: Profile
  },
)


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: LOAD_PREV_CART })
    dispatch(loadHome())
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
            exact
            key={view.route}
            path={view.route}
            component={view.view} />)
        }
        <Route
          exact
          path="/profile/:id"
          component={Profile}
        />
        <Route
          exact
          path="/:category/:id"
          component={DetailProduct}
        />
        <Route
          exact
          path="/:category"
          component={Menu}
        />
        <Route
          exact
          path="/detail/:id"
          component={DetailProduct}
        />
      </AnimatedSwitch>
    </AppLayout>
  );
}



export default App;
