import React from 'react'
import { Switch, Route } from 'react-router-dom'; 
import Home from './components/Home';
import Layout from './hoc/Layout';
import LoginRegister from './components/Login_Register';
import Register from './components/Login_Register/Register';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login_register" exact component={LoginRegister} />
        <Route path="/" exact component={Home}/>
      </Switch>
    </Layout>
  )
}

export default Routes;