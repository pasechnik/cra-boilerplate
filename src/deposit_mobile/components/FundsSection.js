import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

class FundsSection extends Component {
  componentDidMount() {
    this.addClasses()
  }

  addClasses = () => {
    const activeDiv = document.getElementsByClassName('slick-current')
    const slickDivs = Array.from(document.getElementsByClassName('slick-slide'))
    slickDivs.forEach((el, i) => {
      if (el === activeDiv[0]) {
        slickDivs[i - 1].className += ' prevSlide'
        slickDivs[i + 1].className += ' nextSlide'
      }
    })
  }

  clearClasses = () => {
    const slickDivs = Array.from(document.getElementsByClassName('slick-slide'))
    slickDivs.forEach((el) => {
      el.classList.remove('nextSlide')
      el.classList.remove('prevSlide')
    })
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
    for (let i = 1; i <= 36; i += 1) {
      deposits.push({ id: i, sum: 200 + (i * 50) })
    }

    return (
      <div>
        <h4 className='deposit-title'>
Funds Amount
        </h4>
        <Slider {...settings} className='deposit-slider'>
          {deposits.map(e => (
            <div key={e.id}>
              <h3>
&euro;
                {e.sum}
              </h3>
            </div>
          ))}
        </Slider>
      </div>
    )
  }
}

FundsSection.propTypes = {
  onDepositChange: PropTypes.func.isRequired,
}

export default FundsSection
