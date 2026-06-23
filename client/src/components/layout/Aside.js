import React from 'react';
import { Link } from 'react-router-dom';

const Aside = () => {
  return (
    <aside className="slide-bar">
      <div className="close-mobile-menu">
        <Link to="#" onClick={e => e.preventDefault()}><i className="fas fa-times"></i></Link>
      </div>
      <nav className="side-mobile-menu">
        <ul id="mobile-menu-active">
          <li className="has-children"><Link to="/">HOME</Link>
            <ul className="sub-menu">
              <li><Link to="/">Homepage One</Link></li>
              <li><Link to="index-2">Homepage Two</Link></li>
              <li><Link to="index-3">Homepage Three</Link></li>
              <li><Link to="index-4">Homepage Four</Link></li>
              <li><Link to="index-5">Homepage Five</Link></li>
            </ul>
          </li>
          <li className="has-children"><Link to="#">PAGES</Link>
            <ul className="sub-menu">
              <li><Link to="about">About Page</Link></li>
              <li><Link to="bmi-calculator">BMI Calculator</Link></li>
              <li><Link to="service">Service Page</Link></li>
              <li><Link to="trainer">Trainer Page</Link></li>
              <li><Link to="trainer-details">Trainer Details</Link></li>
              <li><Link to="pricing">Pricing Page</Link></li>
              <li><Link to="404">404 Page</Link></li>
            </ul>
          </li>
          <li className="has-children"><Link to="className">CLASSES</Link>
            <ul className="sub-menu">
              <li><Link to="className">Class Page</Link></li>
              <li><Link to="className-2">Class Two</Link></li>
              <li><Link to="className-schedule">Class Schedule</Link></li>
              <li><Link to="className-details">Class Details One</Link></li>
              <li><Link to="className-details-2">Class Details Two</Link></li>
              <li><Link to="className-details-3">Class Details Three</Link></li>
            </ul>
          </li>
          <li className="has-children"><Link to="gallery">Gallery</Link>
            <ul className="sub-menu">
              <li><Link to="gallery">Gallery Page</Link></li>
              <li><Link to="gallery-2">Gallery Page Two</Link></li>
              <li><Link to="gallery-carousel">Gallery Carousel</Link></li>
              <li><Link to="gallery-details">Gallery Details</Link></li>
            </ul>
          </li>
          <li className="has-children"><Link to="blog">BLOG</Link>
            <ul className="sub-menu">
              <li><Link to="blog-grid">Blog Grid</Link></li>
              <li><Link to="blog">Blog Standard</Link></li>
              <li><Link to="blog-details">Blog Details</Link></li>
            </ul>
          </li>
          <li className="has-children"><Link to="shop">SHOP</Link>
            <ul className="sub-menu">
              <li><Link to="shop">Shop Page</Link></li>
              <li><Link to="shop-2">Shop Two</Link></li>
              <li><Link to="shop-details">Shop Details</Link></li>
            </ul>
          </li>
          <li className="has-children"><Link to="contact">Contact</Link>
            <ul className="sub-menu">
              <li><Link to="contact">Contact Page</Link></li>
              <li><Link to="contact-2">Contact Two</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <div className="sidebar-widget-wrapper">
        <div className="sidebar-widget logo-side"><Link to="/"><img src="assets/img/logo/logo.png" alt="logo" /></Link>
        </div>
        <div className="sidebar-widget">
          <div className="info-wdget">
            <h4 className="widget-title">Office Address</h4>
            <p>23/A,Miranda City Likaoli Prikano,Dope </p>
          </div>
        </div>
        <div className="sidebar-widget">
          <div className="info-wdget">
            <h4 className="widget-title">Phone Number</h4>
            <p>+0989 7876 9865 9 </p>
            <p>+(090) 8765 86543 85 </p>
          </div>
        </div>
        <div className="sidebar-widget">
          <div className="info-wdget">
            <h4 className="widget-title">Email Address</h4>
            <p>info@jsaco.net</p>
            <p>help@jsaco.net</p>
          </div>
        </div>
        <div className="sidebar-widget">
          <div className="instagram">
            <Link to="#"><img src="assets/img/widget/gallery-1.jpg" alt="instagram" /></Link>
            <Link to="#"><img src="assets/img/widget/gallery-2.jpg" alt="instagram" /></Link>
            <Link to="#"><img src="assets/img/widget/gallery-3.jpg" alt="instagram" /></Link>
            <Link to="#"><img src="assets/img/widget/gallery-4.jpg" alt="instagram" /></Link>
            <Link to="#"><img src="assets/img/widget/gallery-1.jpg" alt="instagram" /></Link>
            <Link to="#"><img src="assets/img/widget/gallery-2.jpg" alt="instagram" /></Link>
          </div>
        </div>
        <div className="sidebar-widget">
          <div className="social-widget">
            <Link to="#"><i className="fab fa-facebook-f"></i></Link>
            <Link to="#"><i className="fab fa-youtube"></i></Link>
            <Link to="#"><i className="fab fa-weibo"></i></Link>
            <Link to="#"><i className="fab fa-weixin"></i></Link>
            <Link to="#"><i className="fab fa-instagram"></i></Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Aside
