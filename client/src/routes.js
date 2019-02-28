import React from 'react'
import { Switch, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Layout from './hoc/Layout';
import LoginRegister from './components/Login_Register';
import Register from './components/Login_Register/Register';
import UserDashboard from './components/User';
import Shop from './components/Shop'
import Auth from './hoc/auth';
import AddProduct from './components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/manage_categories';
import ProductPage from './components/Product';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/UpdateProfile';
import ManageSite from './components/User/Admin/manage_site';
import PageNotFound from './utils/page_not_found';
import AddFile from './components/User/Admin/add_file';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
        <Route path="/admin/site_info" exact component={Auth(ManageSite,true)}/>
        <Route path="/admin/add_file" exact component={Auth(AddFile, true)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/login_register" exact component={Auth(LoginRegister, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)}/>
        <Route exact component={Auth(PageNotFound)}/>
      </Switch>
    </Layout>
  )
}

export default Routes;