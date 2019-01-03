import React from 'react';
import MyButton from '../../utils/Button';
import FontAwesomeIcom from '@fortawesome/react-fontawesome';
import { faTruck, faCheck, faTimes } from '@fortawesome/fontawesome-free-solid';

const ProdInfo = (props) => {

  const showProdTags = (detail) => {
   
    return (
      <div className="product_tags">
      { detail.shipping ? 
        <div className="tag">
          <div><FontAwesomeIcom icon={faTruck}/></div>
          <div className="tag_text">
            <div>Free shipping</div>
            <div>And return</div>
          </div>
        </div>
        :null
      }
      {
        detail.available ?
        <div className="tag">
          <div><FontAwesomeIcom icon={faCheck}/></div>
          <div className="tag_text">
            <div>Avaiable</div>
            <div>in store</div>
          </div>
        </div>
        : 
        <div className="tag">
          <div><FontAwesomeIcom icon={faTimes}/></div>
          <div className="tag_text">
            <div>Not Available</div>
            <div>Preorder only</div>
          </div>
        </div>
      }
    </div>
    );
    
  }

  const showProdActions = (detail) => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(detail._id)
          }}
        />
      </div>
    </div>
  )

  const showProdSpecifications = (detail) => (
    <div className="product_specifications">
      <h2>Specifications:</h2>
      <div className="item">
        <strong>Frets:</strong> {detail.frets}
      </div>
      <div className="item">
        <strong>Wood:</strong> {detail.wood.name}
      </div>
    </div>
  )

  console.log(props.detail);
  return (
    <div>
   
      <h1>{props.detail[0].brand.name} {props.detail[0].name}</h1>
      <p>
        {props.detail.description}
      </p>
      {showProdTags(props.detail[0])}
      {showProdActions(props.detail[0])}
      {showProdSpecifications(props.detail[0])}
    </div>
  )
}

export default ProdInfo
