import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Input, Label } from 'reactstrap'
import Slider from 'react-slick'

class FundsSection extends Component {
  clearClasses = () => {
    const activeDiv = document.getElementsByClassName('slick-current')
    const slickDivs = Array.from(document.getElementsByClassName('slick-slide'))
    slickDivs.forEach((el, i) => {
      el.classList.remove('nextSlide')
      el.classList.remove('prevSlide')
    })
  }
  addClasses = () => {
    const activeDiv = document.getElementsByClassName('slick-current')
    const slickDivs = Array.from(document.getElementsByClassName('slick-slide'))
    slickDivs.forEach((el, i) => {
      if (el == activeDiv[0]) {
        slickDivs[i - 1].className += ' prevSlide'
        slickDivs[i + 1].className += ' nextSlide'
      }
    })
  }
  componentDidMount() {
    this.addClasses()
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20px',
      slidesToShow: 5,
      beforeChange: () => {
        this.clearClasses()
      },
      afterChange: (e) => {
        this.addClasses()
        this.props.onDepositChange(e)
      },
    }
    const deposits = []
    for (let i = 1; i <= 36; i++) {
      deposits.push(200 + i * 50)
    }

    return (
      <div>
        <h4 className='deposit-title'>Funds Amount</h4>
        <Slider {...settings} className='deposit-slider'>
          {deposits.map((e, i) => (
            <div key={i}>
              <h3>&euro;{e}</h3>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

export default FundsSection
