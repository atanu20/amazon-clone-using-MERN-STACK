import React from 'react'
import Slider from "react-slick";
import './SliderHome.css'

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true
  };

const SliderHome = () => {
    return (
        <>
        <div className="slider">
        <Slider {...settings}>
            

            
          <div className="slider_box">
           <img src="assets/slider/slider1.jpg" alt="slider" className="sliderimg" />
          </div>
          <div className="slider_box">
           <img src="assets/slider/slider2.jpg" alt="slider" className="sliderimg" />
          </div>
          <div className="slider_box">
           <img src="assets/slider/slider3.jpg" alt="slider" className="sliderimg" />
          </div>

        </Slider>
        </div>
            
        </>
    )
}

export default SliderHome
