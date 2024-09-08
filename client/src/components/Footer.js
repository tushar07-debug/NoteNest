import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './Card.css';

const Footer = () => {
    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                background: 'linear-gradient(120deg, #000000, #434343)', // Black to gray gradient background
                color: '#ffffff', // White text color
                padding: '10px 0', // Padding for top and bottom
                position: 'fixed',
                bottom: 0,
                width: '100%',
                boxShadow: '0px -4px 8px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
            }}
            data-bs-theme="dark"
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link
                    className="navbar-brand me-auto d-lg-flex d-md-flex align-items-center"
                    to="/"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <p style={{ margin: '0 5px 0 0', color: '#ffffff', fontSize: '1rem' }}>NoteNest - Copyright</p>
                    <span style={{ color: '#ffffff', fontSize: '1rem' }}>&#169;</span>
                    <p style={{ margin: '0 0 0 5px', color: '#ffffff', fontSize: '1rem' }}>2024</p>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
                        <li className="nav-item">
                            <Link
                                className="link nav-link active"
                                aria-current="page"
                                to="/"
                                style={{ color: '#ffffff', fontSize: '1rem' }} // White text color and adjusted font size
                            >
                                Terms of Use
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="link nav-link"
                                to="/"
                                style={{ color: '#ffffff', fontSize: '1rem' }} // White text color and adjusted font size
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="link nav-link"
                                to="/"
                                style={{ color: '#ffffff', fontSize: '1rem' }} // White text color and adjusted font size
                            >
                                Sitemap
                            </Link>
                        </li>
                    </ul>
                    <ToastContainer />
                </div>
            </div>
        </nav>
    );
};

export default Footer;
