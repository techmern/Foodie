import React, { useEffect, useState } from 'react'
import User_Navbar from '../CommonLayouts/User_Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';


function About_us() {

    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className='mt-5'>

            <div>
                <User_Navbar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
            </div>
            <h2 style={{ marginTop: '90px', textAlign: 'center' }}> Know About Us</h2>

            <div className='about-us mt-4'>
                <div className='container-fluid mb-4'>
                    <div className='row justify-content-center'>
                        <div className='col-md-6'>
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <h2 style={{ marginTop: '40px' }}>Foodie</h2>
                                <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                                <p>The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
                                <div>
                                    <button type="button" className="btn btn-dark btn-lg mt-4">Explore More</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4' style={{ marginTop: '40px' }}>
                            <img
                                src='aboutus.jpg'
                                className='about-img ms-4'
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    transition: 'transform 0.4s, box-shadow 0.4s',
                                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                                    transform: 'scale(1)',
                                }}
                                alt='image'
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <footer className="footer text-white py-3 text-center" style={{ backgroundColor: '#CFD8DC', marginTop: '40px' }}>
                    <div className="container-fluid">
                        <div className="row" data-aos="fade-up" data-aos-duration="1000">
                            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
                                <h5 style={{ color: 'black', marginBottom: '20px' }}>About Foodie</h5>
                                <ul className="list-unstyled">
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Who We Are</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Blog</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Work With Us</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Investor Relations</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Report Fraud</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Press Kit</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Contact Us</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
                                <h5 style={{ color: 'black', marginBottom: '20px' }}>ZOMAVERSE</h5>
                                <ul className="list-unstyled">
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Foodie</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Blinkit</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Feeding India</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Hyperpure</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Foodieland</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
                                <h5 style={{ color: 'black', marginBottom: '20px' }}>FOR RESTAURANTS</h5>
                                <ul className="list-unstyled">
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Partner With Us</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Apps For You</a></li>
                                </ul>
                            </div>
                            <div className="col-md-3 mt-4" data-aos="fade-up" data-aos-duration="1000">
                                <h5 style={{ color: 'black', marginBottom: '20px' }}>LEARN MORE</h5>
                                <ul className="list-unstyled">
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Privacy</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Security</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Terms</a></li>
                                    <li style={{ marginBottom: '5px' }}><a href="#" style={{ color: 'black', textDecoration: 'none' }}>Sitemap</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-2">
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <a href="#"><img src="/path/to/image1" alt="Social Link 1" className="img-fluid" /></a>
                            </div>
                            <div className="col-auto">
                                <a href="#"><img src="/path/to/image2" alt="Social Link 2" className="img-fluid" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <p style={{ color: 'black' }}> &copy; {new Date().getFullYear()} Your Food Delivery App</p>
                    </div>
                </footer>

            </div>

        </div>
    )
}

export default About_us