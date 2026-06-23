import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
  <header className="header-area">
    <div className="container-fluid">
      <div className="row align-items-center justify-content-xl-end">
        <div className="col-xl-2 col-lg-2 col-md-3 col-6">
          <div className="ml-5 logo-area"><Link to="/"><img src="assets/img/logo/logo-placeholder.png" alt="Logo" /></Link></div>
        </div>
        <div className="col-xl-9 d-xl-flex justify-content-end align-items-center d-none">
          <nav className="main-menu">
            <ul>
              <li className="has-dropdown"><Link to="/">HOME</Link>
                <ul className="sub-menu">
                  <li><Link to="/">Homepage One</Link></li>
                  <li><Link to="index-2">Homepage Two</Link></li>
                  <li><Link to="index-3">Homepage Three</Link></li>
                  <li><Link to="index-4">Homepage Four</Link></li>
                  <li><Link to="index-5">Homepage Five</Link></li>
                </ul>
              </li>
              <li className="has-dropdown"><Link to="#">PAGES</Link>
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
              <li className="has-dropdown"><Link to="className">CLASSES</Link>
                <ul className="sub-menu">
                  <li><Link to="className">Class Page</Link></li>
                  <li><Link to="className-2">Class Two</Link></li>
                  <li><Link to="className-schedule">Class Schedule</Link></li>
                  <li><Link to="className-details">Class Details One</Link></li>
                  <li><Link to="className-details-2">Class Details Two</Link></li>
                  <li><Link to="className-details-3">Class Details Three</Link></li>
                </ul>
              </li>
              <li className="has-dropdown"><Link to="gallery">Gallery</Link>
                <ul className="sub-menu">
                  <li><Link to="gallery">Gallery Page</Link></li>
                  <li><Link to="gallery-2">Gallery Page Two</Link></li>
                  <li><Link to="gallery-carousel">Gallery Carousel</Link></li>
                  <li><Link to="gallery-details">Gallery Details</Link></li>
                </ul>
              </li>
              <li className="has-dropdown"><Link to="blog">BLOG</Link>
                <ul className="sub-menu">
                  <li><Link to="blog-grid">Blog Grid</Link></li>
                  <li><Link to="blog">Blog Standard</Link></li>
                  <li><Link to="blog-details">Blog Details</Link></li>
                </ul>
              </li>
              <li className="has-dropdown"><Link to="shop">SHOP</Link>
                <ul className="sub-menu">
                  <li><Link to="shop">Shop Page</Link></li>
                  <li><Link to="shop-2">Shop Two</Link></li>
                  <li><Link to="shop-details">Shop Details</Link></li>
                </ul>
              </li>
              <li className="has-dropdown"><Link to="contact">Contact</Link>
                <ul className="sub-menu">
                  <li><Link to="contact">Contact Page</Link></li>
                  <li><Link to="contact-2">Contact Two</Link></li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-xl-1 col-lg-2 col-md-3 col-2 d-flex justify-content-center align-items-center ml-auto">
          <Link to="/#" onClick={e => e.preventDefault()} className="hamburger-menu">
            <div className="hamburger-btn">
              <div className="hamburger-bar"></div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Navbar
