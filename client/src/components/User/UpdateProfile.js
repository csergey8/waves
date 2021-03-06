import React from 'react';
import UserLayout from '../../hoc/UserLayout';
import UpdatePersonalNfo from '../User/UpdatePersonalNfo';


const UpdateProfile = () => {
  return (
    <UserLayout>
      <h1>Profile</h1>
      <UpdatePersonalNfo />
    </UserLayout>
  )

}

export default UpdateProfile;