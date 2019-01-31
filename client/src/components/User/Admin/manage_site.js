import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import UpdateSiteNfo from './update_site_nfo';

export default class ManageSite extends Component {
  render() {
    return (
      <UserLayout>
        <UpdateSiteNfo />
      </UserLayout>
    )
  }
}
