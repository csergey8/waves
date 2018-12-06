import React from 'react';
import MyButton from '../../utils/Button';

const HomePromotions = (props) => {
  const promotion = {
    img: '/images/featured/featured_home_3.jpg',
    lineOne: 'Up to 40%',
    lineTwo: 'In seconds hand guitars',
    linkTilte: 'Shop Now',
    linkTo: '/shop'
  }

  const renderPromotion = () => (
    promotion ? 

      <div className="home_promotion_img" style={{ background: `url(${promotion.img})`}}>
        <div className="tag title">{promotion.lineOne}</div>
          <div className="tag low_title">{promotion.lineTwo}</div>
          <div>
            <MyButton
              type="default"
              title={promotion.linkTilte}
              linkTo={promotion.linkTo}
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
      </div>


    : null
  );
  return (
    <div className="home_promotion">
      {renderPromotion()}
    </div>
  )
}

export default HomePromotions;
