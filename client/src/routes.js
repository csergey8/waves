import React from 'react'
import { Switch, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Layout from './hoc/Layout';
import LoginRegister from './components/Login_Register';
import Register from './components/Login_Register/Register';
import UserDashboard from './components/User';
import Auth from './hoc/auth';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/login_register" exact component={Auth(LoginRegister, false)} />
        <Route path="/" exact component={Auth(Home, null)}/>
      </Switch>
    </Layout>
  )
}

export default Routes;