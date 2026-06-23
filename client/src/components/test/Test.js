import React from 'react';
import { Link } from 'react-router-dom';
// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
const Test = () => {
  return (
    <section className="service-area service-area-spacing pt-130">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-12 col-lg-12">
            <div className="section-title-2 text-white text-center mb-60">
              <h3>We Offer Exclusive Services For Build Health</h3><span>Services</span>
            </div>
          </div>
        </div>
        <div className="row no-gutters">
          <div className="col-xl-12">
            <Swiper className="service-slider">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide single-slide">
                    <SwiperSlide className="service-item">
                      <div className="service-img"><img src="assets/img/service/service-1.jpg" alt="Services" /></div>
                      <div className="service-content">
                        <div className="icon"><i className="flaticon-gym-7"></i></div>
                        <h3>Dumbbelling</h3>
                        <p>Ratione voluptatem sequi neunte Neque porro quisquam estde.</p><Link to="service.html"
                          className="read-more">READ MORE <i className="fas fa-angle-double-right"></i></Link><span
                          className="service-number">考试</span>
                      </div>
                    </SwiperSlide>
                  </div>
                  <SwiperSlide className="swiper-slide single-slide">
                    <div className="service-item">
                      <div className="service-img"><img src="assets/img/service/service-2.jpg" alt="Services" /></div>
                      <div className="service-content">
                        <div className="icon"><i className="flaticon-gym-5"></i></div>
                        <h3>Cycling GYM</h3>
                        <p>Great pleasure. To take a trivial example,which of us ever utakes laborious physical exercise
                        </p><Link to="service.html" className="read-more">READ MORE <i
                            className="fas fa-angle-double-right"></i></Link>
                        <div className="service-number">提升</div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <div className="swiper-slide single-slide">
                    <div className="service-item">
                      <div className="service-img"><img src="assets/img/service/service-3.jpg" alt="Services" /></div>
                      <div className="service-content">
                        <div className="icon"><i className="flaticon-workout"></i></div>
                        <h3>Grid Training</h3>
                        <p>Ratione voluptatem sequi neunte Neque porro quisquam estde.</p><Link to="service.html"
                          className="read-more">READ MORE <i className="fas fa-angle-double-right"></i></Link>
                        <div className="service-number">训练</div>
                      </div>
                    </div>
                  </div>
                  <SwiperSlide className="swiper-slide single-slide">
                    <div className="service-item">
                      <div className="service-img"><img src="assets/img/service/service-4.jpg" alt="Services" /></div>
                      <div className="service-content white-color">
                        <div className="icon"><i className="flaticon-fight"></i></div>
                        <h3>Boxing</h3>
                        <p>Ratione voluptatem sequi neunte Neque porro quisquam estde.</p><Link to="service.html"
                          className="read-more">READ MORE <i className="fas fa-angle-double-right"></i></Link>
                        <div className="service-number">畅玩</div>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </div>
            </Swiper>
          </div>
        </div>
        <div className="service-left-shape"><i className="fas fa-snowboarding"></i></div>
        <div className="service-right-shape"><i className="fas fa-snowboarding"></i></div>
      </div>
      <div className="gradient-bg"></div>
    </section>
  )
}

export default Test
