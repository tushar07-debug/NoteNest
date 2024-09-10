import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Card.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const initialvalue = {
    title: '',
    id: '',
    subtitle: '',
    author: '',
    price: '',
    url1: '',
};

const Search = () => {
    const [data, setData] = useState(initialvalue);
    const location = useLocation();
    const { search } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (!search || search.trim() === '') {
                toast.warn("Please enter text to search", { pauseOnHover: false });
                return;
            }

            try {
                const response = await axios.post(`http://localhost:3001/search`, { search });
                if (response.status === 200 && response.data) {
                    setData({ 
                        title: response.data.title, 
                        id: response.data._id, 
                        subtitle: response.data.subtitle, 
                        author: response.data.author, 
                        price: response.data.price, 
                        url1: response.data.url1 
                    });
                } else {
                    toast.warn("No results found for your search.", { pauseOnHover: false });
                }
            } catch (err) {
                const errorMessage = err.response?.data || err.message;
                toast.error(errorMessage, { position: 'top-center' });
            }
        }

        fetchData();
    }, [search]);

    function textLimiter(str, limit) {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }

    return (
        <div className='min-vh-100'>
            <ToastContainer />
            {data.id ? (
                <Link to={`/carddetail/${data.id}`} className="card ms-2 m-3 Card text-decoration-none" style={{ width: '30rem', marginTop: '-19px !important' }}>
                    <div className="row g-0">
                        <div className="col-md-5 Img-container">
                            <img src={data.url1} alt={data.title} className="img-fluid" style={{ objectFit: 'cover', height: '100%', marginLeft: 'auto', marginRight: 'auto', width: '12rem' }} />
                        </div>
                        <div className="col-md-7">
                            <div className="card-body d-flex flex-column justify-content-between h-100">
                                <h5 className="card-title alert alert-dark text-center fw-bold">{textLimiter(data.title, 40)}</h5>
                                <p className="card-text text-success">{textLimiter(data.author, 40)}</p>
                                <p className="card-text text-dark-emphasis">{textLimiter(data.subtitle, 40)}</p>
                                <p className="card-text text-primary">MRP: Rs. {data.price}</p>
                                <button onClick={() => console.log('Buy Now clicked')} className="btn btn-warning mt-2">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </Link>
            ) : null}
        </div>
    );
}

export default Search;
