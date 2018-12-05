import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user_actions';
import { CircularProgress } from '@material-ui/core';

export default function(ComposedClass, reload, adminRoute = 0) {
  class AuthenticationCheck extends Component {

    state = {
      isLoading: true
    }

    componentDidMount() {
      this.props.dispatch(auth())
        .then(res => {
          let user = this.props.user.userData;
          
          if(!user.isAuth) {
            if(reload) {
              this.props.history.push('/login_register');
            }
          } else {
            if(adminRoute && !user.isAdmin) {
              this.props.history.push('/user/dashboard');
            } else {
              if(reload === false) {
                this.props.history.push('/user/dashboard');
              }
            }
          }



          this.setState({
            isLoading: false
          })
        })
    }

    render() {
      if(this.state.isLoading) {
        return (
          <div className="main_loader">
            <CircularProgress
              style={{
                color: '#2196F3'
              }}
              thickness={7}
            />
          </div>
        )
      }
      return (
        <ComposedClass {...this.props} user={this.props.user}/>
      );
    }
  }  

  function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  return connect(mapStateToProps)(AuthenticationCheck);
  
}



