import React from 'react';
import { Link } from 'react-router-dom';

const UserLayout = (props) => {
  const links = [
    {
      name: 'My account',
      linkTo: '/user/dashboard'
    },
    {
      name: 'User Information',
      linkTo: '/user/user_profile'
    },
    {
      name: 'My cart',
      linkTo: '/user/cart'
    }
  ];

  const generateLinks = (links) => {
    return (
      links.map((link, i) => (
        <Link to={link.linkTo} key={i}>{link.name}</Link>
      ))
    )
  }
  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My account</h2>
          <div className="links">
            {generateLinks(links)}
          </div>
        </div>
        <div className="user_right">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default UserLayout;
