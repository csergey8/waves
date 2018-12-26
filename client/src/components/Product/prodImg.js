import React, { Component } from 'react'

class ProdImg extends Component {
  state = {
    lightBox: false,
    imagePos: 0,
    lightBoxImages: []
  }

  componentDidMount() {
    if(this.props.detail[0].images.length > 0) {
      let lightBoxImages = []

      this.props.detail[0].images.forEach(item => {
        lightBoxImages.push(item.url)
      })
      this.setState({
        lightBoxImages
      })
    } else {

    }
  }

  handleLightBox = () => {

  }

  renderCardImage = (images) => {
    if(images.length > 0){
      return images[0].url
    } else {
      return `/images/image_not_availble.png`
    }
  }

  showThumbs = () => (
    this.state.lightBoxImages.map((item, i) => (
      i > 0 ?

      <div 
      key={i}
      onClick={() => this.handleLightBox(i)}
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
            onClick={() => this.handleLightBox(0)}
          >
          
          </div>
        </div>
        <div className="main_thumbs">
          {this.showThumbs(detail)}
        </div>
      </div>
    )
  }
}

export default ProdImg;
