import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Restaurant_View from '../User_Restaurant/Restaurant_View';
import User_Navbar from '../CommonLayouts/User_Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Welcomepage_User() {

    ///fetch city
    const [selectedCity, setSelectedCity] = useState('');

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    useEffect(() => {
        AOS.init();
    }, []);

    const aboutusimg = {
        width: '110%',
        height: 'auto',
    };

    return (
        <div>
            <User_Navbar selectedCity={selectedCity} setSelectedCity={setSelectedCity} />

            <div className='gallary' data-aos="fade-up" data-aos-duration="1000">
                <div className="container-fluid ">
                    <div className='row' >
                        <div className="gallary-image" style={{
                            backgroundImage: 'url(/gallary.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '700px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            flexDirection: 'column',
                            position: 'relative',
                            boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',


                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            }}></div>
                            <p style={{ fontSize: '50px', fontWeight: 'bold', zIndex: 1, color: 'white', fontFamily: 'cursive', marginTop: '50px' }}>Foodies</p>
                            <p style={{ fontSize: '35px', fontWeight: 'bold', zIndex: 1, color: 'white', fontFamily: 'cursive' }}>Delicious Delights</p>

                            <form className="d-flex justify-content-center" style={{ zIndex: 1 }}>
                                <input
                                    className="form-control me-2"
                                    type="text"
                                    placeholder="Search by Restaurants"
                                    style={{
                                        width: '400px',
                                        height: '50px',
                                        fontSize: '18px',
                                        textAlign: 'center',
                                        margin: '20px auto',
                                        zIndex: 1
                                    }}
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </form>

                        </div>


                    </div>
                </div>
            </div>

            <div className="container-fluid mt-4" data-aos="fade-up" data-aos-duration="1000">
                <h3 className='text-center mb-4' style={{ fontSize: '35px' }}> Discover New Tastes</h3>
                <Restaurant_View selectedCity={selectedCity} searchQuery={searchQuery} />
            </div>

            <div className='about-us mt-4' data-aos="fade-up" data-aos-duration="1000" >
                <div className='container-fluid mb-4'>
                    <div className='row justify-content-center' >
                        <div className='col-md-6'>
                            <div data-aos="fade-up" data-aos-duration="1000">
                                <h2 style={{ marginTop: '40px', cursor: 'pointer', fontSize: '35px' }}
                                    onMouseEnter={(e) => e.target.style.color = 'grey'}
                                    onMouseLeave={(e) => e.target.style.color = 'initial'}>About Us</h2>
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
    );
}

export default Welcomepage_User;
