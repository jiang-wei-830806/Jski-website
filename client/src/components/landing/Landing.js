import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <main>
    <section className="slider-area">
      <div className="swiper-container home-slider-1">
        <div className="swiper-wrapper">
          <div className="swiper-slide single-slide">
            <div className="container">
              <div className="row">
                <div className="col col-xl-10 col-lg-8 col-xl-6">
                  <div className="slider-content-1 ">
                    <span data-animation="fadeInUp" data-delay="0.3s">欢迎来到</span>
                    <h2 data-animation="fadeInUp" data-delay="0.6s">JSKI滑雪学校</h2>
                    <Link to="/#" onClick={e => e.preventDefault()} className="btn btn-gra" data-animation="fadeInUp" data-delay="0.9s">点此报名<i className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-thumb-1" data-animation="fadeIn" data-delay="0.3s"><img
                src="assets/img/landing/image-1.jpg" /></div>
          </div>
          <div className="swiper-slide single-slide">
            <div className="container">
              <div className="row">
                <div className="col-xl-10 col-lg-8 col-xl-6">
                  <div className="slider-content-1">
                    <span data-animation="fadeInUp" data-delay="0.3s">体验单板</span>
                    <h2 data-animation="fadeInUp" data-delay="0.6s">个性飞舞</h2>
                    <span data-animation="fadeInUp" data-delay="0.3s">zhang</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-thumb-1" data-animation="fadeIn" data-delay="0.3s"><img
                src="assets/img/landing/image-2.jpg" alt="thumb" /></div>
          </div>
          <div className="swiper-slide single-slide">
            <div className="container">
              <div className="row">
                <div className="col-xl-10 col-lg-8 col-xl-6">
                  <div className="slider-content-1"><span data-animation="fadeInUp" data-delay="0.3s">Different Form Others
                    </span>
                    <h2 data-animation="fadeInUp" data-delay="0.6s">Build A Perferct Health Growth</h2><Link to="/#" onClick={e => e.preventDefault()}                       className="btn btn-gra" data-animation="fadeInUp" data-delay="0.9s">join with us <i
                        className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-thumb-1" data-animation="fadeIn" data-delay="0.3s"><img
                src="assets/img/landing/image-3.jpg" alt="thumb" /></div>
          </div>
          <div className="swiper-slide single-slide">
            <div className="container">
              <div className="row">
                <div className="col-xl-10 col-lg-8 col-xl-6">
                  <div className="slider-content-1"><span data-animation="fadeInUp" data-delay="0.3s">Different Form Others
                    </span>
                    <h2 data-animation="fadeInUp" data-delay="0.6s">Build A Perferct Health Growth</h2><Link to="/#" onClick={e => e.preventDefault()}                       className="btn btn-gra" data-animation="fadeInUp" data-delay="0.9s">join with us <i
                        className="fas fa-angle-double-right"></i></Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="slide-thumb-1" data-animation="fadeIn" data-delay="0.3s"><img
                src="assets/img/landing/image-4.jpg" alt="thumb" /></div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"><i className="far fa-angle-left"></i></div>
        <div className="swiper-button-next"><i className="far fa-angle-right"></i></div>
      </div>
    </section>
    <section className="about-area pt-130 pb-130">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-10">
            <div className="about-img mb-md-60 mb-xs-60"><img src="assets/img/thumb/thumb-1.jpg" alt="About image" />
            </div>
          </div>
          <div className="col-lg-8 col-md-12">
            <div className="about-content">
              <div className="section-title mb-30">
                <h3>We Are More Effective To Making Different Yourself From Others</h3><span>学校介绍</span>
              </div>
              <div className="about-text">
                <p>Master-builder of human happiness. No one rejects dislikes or avoids pleasure itself because it is
                  plsure but because those who do not know how to pursue pleasure rationally encounter consequences that
                  are extremely painful again is there anyone </p><Link to="about.html" className="btn btn-theme mt-40">LEARN
                  MORE <i className="fas fa-angle-double-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
            <div className="service-slider">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide single-slide">
                    <div className="service-item">
                      <div className="service-img"><img src="assets/img/service/service-1.jpg" alt="Services" /></div>
                      <div className="service-content">
                        <div className="icon"><i className="flaticon-gym-7"></i></div>
                        <h3>Dumbbelling</h3>
                        <p>Ratione voluptatem sequi neunte Neque porro quisquam estde.</p><Link to="service.html"
                          className="read-more">READ MORE <i className="fas fa-angle-double-right"></i></Link><span
                          className="service-number">考试</span>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide single-slide">
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
                  </div>
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
                  <div className="swiper-slide single-slide">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="service-left-shape"><i className="fas fa-snowboarding"></i></div>
        <div className="service-right-shape"><i className="fas fa-snowboarding"></i></div>
      </div>
      <div className="gradient-bg"></div>
    </section>
    <section className="feature-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-10">
            <div className="section-title mb-70 mb-xs-50">
              <h3>Welcome To Gymee An Exclusive Gymasian</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="feature-slider-1">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-weight"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>Crosfit Tools</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-gym-7"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>Health Caring</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-gym-3"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>GYM Strategies</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-yoga-3"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>Beauty &npsb; Spa</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-weight"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>Crosfit Tools</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-gym-7"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>Health Caring</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-gym-3"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>GYM Strategies</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="feature-wrap">
                      <div className="feature-icon-wrap">
                        <div className="feature-icon"><i className="flaticon-yoga-3"></i></div>
                      </div>
                      <div className="feature-details">
                        <h3>Beauty &npsb; Spa</h3>
                        <p>Many desktop publish pages and web page editw</p><Link to="about.html" className="read-more">READ
                          MORE <i className="fas fa-angle-double-right"></i></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-button-prev"><i className="far fa-angle-double-left"></i></div>
              <div className="swiper-button-next"><i className="far fa-angle-double-right"></i></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="team-area pt-130 pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="section-title-2 bar-theme-color mb-25">
              <h3>We Have Expert Team Member Meet Our Trainer </h3><span>Team</span>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="team-wrap mb-30">
                  <div className="team-img"><img src="assets/img/team/team.jpg" alt="Team" />
                    <div className="team-social-link">
                      <ul>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-instagram"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-google"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3><Link to="trainer-details.html">Howard C. Skinner</Link></h3><span>Dumbbell Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="team-wrap mb-30">
                  <div className="team-img"><img src="assets/img/team/team-2.jpg" alt="img" />
                    <div className="team-social-link">
                      <ul>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-instagram"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-google"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3><Link to="trainer-details.html">Raymond L. Brown</Link></h3><span>Boxing Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="team-wrap mb-30">
                  <div className="team-img"><img src="assets/img/team/team-3.jpg" alt="" />
                    <div className="team-social-link">
                      <ul>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-instagram"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-google"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3><Link to="trainer-details.html">Charles T. McAllister</Link></h3><span>Caradio Trainer</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="team-wrap mb-30">
                  <div className="team-img"><img src="assets/img/team/team-4.jpg" alt="" />
                    <div className="team-social-link">
                      <ul>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-facebook-f"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-twitter"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-instagram"></i></Link></li>
                        <li><Link to="/#" onClick={e => e.preventDefault()} ><i className="fab fa-google"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="team-content">
                    <h3><Link to="trainer-details.html">Solomon K. Sawyers</Link></h3><span>Beauty Trainer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-right mb-30"><img src="assets/img/team/team-5.jpg" alt="team" />
        <div className="team-button"><Link to="trainer.html" className="btn btn-gra">VIEW ALL TRAINER <i
              className="fas fa-angle-double-right"></i></Link></div>
      </div>
      <div className="gray-bg"></div>
    </section>
    <section className="process-area pt-130 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-12">
            <div className="section-title-2 text-white bar-theme-color text-center mb-35">
              <h3>We Do Our Work By Following Some Steps </h3><span>Process</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="process-wrap mb-30">
              <div className="process-icon-wrap">
                <div className="process-icon"><i className="flaticon-running"></i><span className="process-number">01</span></div>
              </div>
              <div className="process-content">
                <h3>Visit Our Gymee</h3>
                <p>Soluta nobis est eligedi optio cumque nihil impedit quo</p>
              </div>
              <div className="process-next"><i className="fas fa-forward"></i></div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="process-wrap mb-30">
              <div className="process-icon-wrap red-gradient">
                <div className="process-icon"><i className="fas fa-recycle"></i><span className="process-number">02</span></div>
                <div className="process-next"><i className="fas fa-forward"></i></div>
              </div>
              <div className="process-content">
                <h3>Time Maintenance</h3>
                <p>Actual teachings of the great explorer of the truth</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="process-wrap mb-30">
              <div className="process-icon-wrap red-gradient">
                <div className="process-icon"><i className="flaticon-gym-2"></i><span className="process-number">03</span></div>
              </div>
              <div className="process-content">
                <h3>Hard Work Out</h3>
                <p>Pursue pleasure ratio encoter consequences that are</p>
              </div>
              <div className="process-next"><i className="fas fa-forward"></i></div>
            </div>
          </div>
          <div className="col-md-6 col-lg-3">
            <div className="process-wrap mb-30">
              <div className="process-icon-wrap">
                <div className="process-icon"><i className="flaticon-abdominal"></i><span className="process-number">04</span></div>
              </div>
              <div className="process-content">
                <h3>Get Result</h3>
                <p>Take a trivial example which of us ever underts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="process-shape-1"><img src="assets/img/shape/shape-1.png" alt="shape" /></div>
      <div className="process-shape-2"><img src="assets/img/shape/shape-2.png" alt="shape" /></div>
    </section>
    <section className="calculator-area pt-130 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-6 offset-lg-6">
            <div className="calculator-chart mb-70">
              <h3>BMI Calculator Chart</h3>
              <table className="table bg-white">
                <thead>
                  <tr>
                    <th scope="col">BMI</th>
                    <th scope="col">Weight Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Below 18.5</td>
                    <td>Underweight</td>
                  </tr>
                  <tr>
                    <td>18.5 - 24.9</td>
                    <td>Healthy</td>
                  </tr>
                  <tr>
                    <td>25.0 - 29.9</td>
                    <td>Overweight</td>
                  </tr>
                  <tr>
                    <td>30.0 - and Above</td>
                    <td>Obese</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="calculator-form">
              <h3>BMI Calculator Chart</h3>
              <form action="#">
                <div className="input-wrap"><input type="text" placeholder="Height/cm" /></div>
                <div className="input-wrap"><input type="text" placeholder="Weight/kg" /></div>
                <div className="input-wrap"><input type="text" placeholder="Weight/kg" /></div>
                <div className="input-wrap"><select id="gender">
                    <option value="gender">Gender</option>
                    <option value="male">Male</option>
                    <option value="fmale">fmale</option>
                  </select></div>
                <div className="input-wrap"><select id="factory">
                    <option value="factory">Activity Factory</option>
                    <option value="one">One</option>
                    <option value="two">Two</option>
                  </select></div>
                <div className="input-wrap"><Link to="/#" onClick={e => e.preventDefault()} className="btn btn-gra">Calculate <i
                      className="fas fa-angle-double-right"></i></Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="calculator-thumb"><img src="assets/img/thumb/thumb-2.png" alt="thumb" /></div>
      <div className="calculator-shape-1"><img src="assets/img/shape/shape-3.png" alt="shape" /></div>
      <div className="calculator-shape-2"><img src="assets/img/shape/shape-4.png" alt="shape" /></div>
    </section>
    <section className="schedule-area pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="section-title-2 bar-theme-color text-center mb-35">
              <h3>Our Class Schedule We Making Scdedule Perfectly </h3><span>Schedule</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="schedule-table">
              <table className="table bg-white">
                <thead>
                  <tr>
                    <th>Routine</th>
                    <th>10 am</th>
                    <th>11 am</th>
                    <th>03 pm</th>
                    <th>05 pm</th>
                    <th>07 pm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="day">Sunday</td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="day">Monday</td>
                    <td></td>
                    <td className="active">
                      <h4>Boxing</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="day">Tuesday</td>
                    <td className="active">
                      <h4>Yoga</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td className="active">
                      <h4>Boxing</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="day">Wednesday</td>
                    <td className="active">
                      <h4>Gym</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Yoga</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Yoga</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="day">Thursday</td>
                    <td></td>
                    <td className="active">
                      <h4>Racing</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td className="day">Friday</td>
                    <td className="active">
                      <h4>Dumbbelling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Grid Training</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                    <td className="active">
                      <h4>Jumping</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="day">Satarday</td>
                    <td></td>
                    <td></td>
                    <td className="active">
                      <h4>Grid Training</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td className="active">
                      <h4>Cycling</h4>
                      <p>10 am - 11 am</p>
                      <div className="hover">
                        <h4>Cycling</h4>
                        <p>10 am - 11 am</p><span>Zakila Russow</span>
                      </div>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="brand-area pt-70 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="brand-slider">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-1.png" alt="brand" /></div>
                  </div>
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-2.png" alt="brand" /></div>
                  </div>
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-3.png" alt="brand" /></div>
                  </div>
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-4.png" alt="brand" /></div>
                  </div>
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-5.png" alt="brand" /></div>
                  </div>
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-6.png" alt="brand" /></div>
                  </div>
                  <div className="swiper-slide single-slide">
                    <div className="brand-wrap"><img src="assets/img/brand/brand-1.png" alt="brand" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  )
}

export default Landing
