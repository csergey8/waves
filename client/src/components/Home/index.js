import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotions from './home_promotions';

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotions />
      </div>
    )
  }
}
