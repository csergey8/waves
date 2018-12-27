import React, { Component } from 'react';
import ImageLightbox from '../../utils/lightbox';

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  }

  componentDidMount() {
    if(this.props.detail[0].images.length > 0) {
      let lightboxImages = []

      this.props.detail[0].images.forEach(item => {
        lightboxImages.push(item.url)
      })
      this.setState({
        lightboxImages
      })
    } else {

    }
  }

  handleLightbox = (pos) => {
    if(this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imagePos: pos
      })
    }
  }

  handleLightboxClose = () => {
    this.setState({
      lightbox: false
    })
  }

  renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    } else {
      return `/images/image_not_availble.png`
    }
  }

  showThumbs = () => (
    this.state.lightboxImages.map((item, i) => (
      i > 0 ?

      <div 
      key={i}
      onClick={() => this.handleLightbox(i)}
      className="thumb"
      style={{
        background: `url(${item}) no-repeat`
      }}
      >
      
      </div>

      : null
    ))
  )

  render() {
    const detail = this.props.detail[0];
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{background: `url(${this.renderCardImage(detail.images)}) no-repeat`}}
            onClick={() => this.handleLightbox(0)}
          >
          
          </div>
        </div>
        <div className="main_thumbs">
          {this.showThumbs(detail)}
        </div>
        {
          this.state.lightbox ?

          <ImageLightbox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.open}
            pos={this.state.imagePos}
            onclose={() => this.handleLightboxClose()}
          />

          : null
        }
      </div>
    )
  }
}

export default ProdImg;
