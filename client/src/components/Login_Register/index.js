import React from 'react';
import MyButton from '../../utils/Button';
import Login from './Login';

const LoginRegister = (props) => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
              <h2>Registered customers</h2>
              <p>If you have an account please log in.</p>
              <Login  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister;
