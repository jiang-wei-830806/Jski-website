import React from 'react'

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="footer-top">
        <div className="container">
          <div className="footer-top-bg">
            <div className="row">
              <div className="col-lg-6">
                <div className="footer-newsletter mb-40">
                  <h3>Newsletters Subscribe</h3>
                  <form action="#" className="news-form">
                    <div className="input-wrap"><input type="email" placeholder="Enter Your Email" /><button><i
                      className="fas fa-angle-double-right"></i></button></div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="footer-apps mb-40">
                  <h3>Download Our Apps</h3>
                  <div className="btn-wrap"><a href="#" className="btn btn-secondary rounded-pill mr-10"><i
                    className="fab fa-android"></i>Google Store </a><a href="#" className="btn btn-gra rounded-pill"><i
                      className="fab fa-windows"></i>Windows </a></div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-80 pb-40">
            <div className="col-md-6 col-lg-4">
              <div className="footer-widgets footer-about-widget">
                <div className="footer-logo"><a href="index.html"><img src="assets/img/logo/logo-white.png" alt="Logo" /></a>
                </div>
                <p>Ratione voluptatem sequi nesciunt. Neque porro quisquam est,qui dolorem ipsum quia dolor sit
                amet,consectetur,adipisci velit,sed quia non um quam eius modi tempora incidunt ut labore et magnam
                aliquam quaerat voluptatem. </p><a className="read-more" href="about.html">Learn more <i
                  className="fas fa-angle-double-right"></i></a>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="footer-widgets latest-news">
                <h3 className="widget-title">Useful Links</h3>
                <div className="news-wrap">
                  <div className="news-img"><a href="#"><img src="assets/img/widget/widget-1.png" alt="widget" /></a></div>
                  <div className="news-content">
                    <h4><a href="blog-details.html">Monthly Web Develop UpdateFunctional CSS,Android </a></h4><span><i
                      className="fas fa-calendar-alt"></i>05 Jan 20</span>
                  </div>
                </div>
                <div className="news-wrap">
                  <div className="news-img"><a href="#"><img src="assets/img/widget/widget-2.png" alt="widget" /></a></div>
                  <div className="news-content">
                    <h4><a href="blog-details.html">We're Touring Southeast Asia Join To Mozilla Developer </a></h4>
                    <span><i className="fas fa-calendar-alt"></i>05 Jan 20</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="footer-widgets contact-widget">
                <h3 className="widget-title">Contact Us</h3>
                <ul>
                  <li><i className="fas fa-home"></i><span>No.123 Chalingt Gates,Supper market New York</span></li>
                  <li><a href="#"><i className="fas fa-envelope"></i><span><span className="__cf_email__"
                    data-cfemail="b8cbcdc8c8d7caccf8dfd5d9d1d496dbd7d5">[email&#160;protected]</span></span></a>
                  </li>
                  <li><a href="#"><i className="fas fa-phone"></i><span>+012(4567) 789</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7 col-lg-6">
              <div className="copyright">
                <p>Copyright <a href="index.html">GYMEE</a>©2020. All Rights <a
                  href="http://www.bootstrapmb.com">Reserved</a></p>
              </div>
            </div>
            <div className="col-md-5 col-lg-6">
              <div className="footer-social-link">
                <ul>
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                  <li><a href="#"><i className="fab fa-google"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
