import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {
    const { name, setName } = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/search', { state: { search } });
        setSearch('');
    }

    const handleCart = () => {
        navigate('/addtocart');
    }

    const handleLogout = () => {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        console.log(sessionStorage);
        navigate("/login");
    }

    return (
        <nav
            className="navbar navbar-expand-lg"
            style={{
                background: 'linear-gradient(120deg, #000000, #555555)', // Black to grey gradient
                color: '#ffffff', // White text color
            }}
            data-bs-theme="dark"
        >
            <div className="container-fluid">
                <Link
                    className="navbar-brand me-auto"
                    to="/"
                    style={{
                        color: '#ffffff', // White text color
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                    }}
                >
                    NoteNest
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
                    <div className="ms-auto me-auto">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link
                                    className="link nav-link active"
                                    aria-current="page"
                                    to="/"
                                    style={{ color: '#ffffff' }} // White text color
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="link nav-link"
                                    to="/about"
                                    style={{ color: '#ffffff' }} // White text color
                                >
                                    About
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link
                                    className="link nav-link"
                                    to="/"
                                    style={{ color: '#ffffff' }} // White text color
                                >
                                    Contact
                                </Link>
                            </li> */}
                            <li className="nav-item">
                                <Link
                                    className="link nav-link"
                                    to="/addbooks"
                                    style={{ color: '#ffffff' }} // White text color
                                >
                                    Add Book
                                </Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link
                                    className="link nav-link"
                                    to="/login"
                                    onClick={handleLogout}
                                    style={{ color: '#ffffff' }} // White text color
                                >
                                    Logout
                                </Link>
                            </li> */}
                        </ul>
                        <ToastContainer />
                    </div>
                    <form
                        className="d-flex flex-column flex-lg-row"
                        role="search"
                        onSubmit={handleSubmit}
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <input
                            className="form-control me-2 w-100"
                            type="search"
                            placeholder="Book Title ..."
                            onChange={handleChange}
                            value={search}
                            style={{
                                width: '15rem',
                                marginBottom: '10px',
                                color: '#ffffff', // White text color
                                backgroundColor: '#333333', // Dark background for input
                                border: '1px solid #555555', // Border to match the gradient
                            }}
                        />
                        <button
                            className="btn btn-primary mt-2 mt-lg-0"
                            type="submit"
                            style={{ width: '5rem', backgroundColor: '#444444', borderColor: '#555555' }} // Matching button color
                        >
                            Search
                        </button>
                    </form>
                    {/* Dropdown menu */}
                    <div
                        className="btn-group ms-lg-3 mt-2 mt-lg-0 me-2"
                        style={{ position: 'relative' }}
                    >
                        <button
                            type="button"
                            className="btn btn-outline-light dropdown-toggle dropdown-toggle-split rounded"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                color: '#ffffff',
                                backgroundColor: '#444444',
                                borderColor: '#555555',
                            }}
                        >
                            <span>
                                <i className="fas fa-user"></i>
                            </span>
                        </button>
                        <ul
                            className="dropdown-menu z-2"
                            style={{
                                backgroundColor: '#333333',
                                color: '#ffffff',
                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <li>
                                <Link className="dropdown-item" to="/profile" style={{ color: '#ffffff' }}>
                                    My Profile
                                </Link>
                            </li>
                            {/* <li>
                                <hr className="dropdown-divider" />
                            </li> */}
                            {/* <li>
                                <a className="dropdown-item" href="#" style={{ color: '#ffffff' }}>
                                    Orders
                                </a>
                            </li> */}
                            <li>
                                <hr className="dropdown-divider" />
                            </li>
                            <li>
                                <Link
                                    className="dropdown-item"
                                    to="/login"
                                    onClick={handleLogout}
                                    style={{ color: '#ffffff' }}
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <button
                        className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0 me-lg-2"
                        style={{
                            width: '3rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#ffffff',
                            backgroundColor: '#444444',
                            borderColor: '#555555',
                        }}
                        onClick={handleCart}
                    >
                        <i className="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
