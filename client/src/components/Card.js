import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './Card.css';
import { Link, useLocation } from 'react-router-dom';

const Card = ({ title, price, url_cover, url_bg, subtitle, author, description, genre, id }) => {
    const location=useLocation();
    const {data,setData}=({})
    const {email,username}=location.state||{};
    console.log("Card",email,username);

    function textLimiter(str, limit) {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }
    return (
            <Link to={`/carddetail/${id}`} state={{email,username}} className="card ms-2 m-3  Card text-decoration-none" style={{ width: '30rem', marginTop: '-19px !important' }}>
                <div className="row g-0">
                    <div className="col-md-5 Img-container">
                        <img src={url_cover} alt={title} className="img-fluid ms-sm-auto me-sm-auto" style={{ objectFit: 'cover', height: '100%', marginLeft: 'auto', marginRight: 'auto', width: '12rem' }} />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body d-flex flex-column justify-content-between h-100">
                            <h5 className="card-title alert alert-dark text-center fw-bold">{textLimiter(title, 40)}</h5>
                            <p className="card-text text-success">{textLimiter(author, 40)}</p>
                            <p className="card-text text-dark-emphasis">{textLimiter(description, 40)}</p>
                            <p className="card-text text-primary">MRP: Rs. {price}</p>
                            <button onClick={() => console.log('Buy Now clicked')} className="btn btn-warning mt-2">Buy Now</button>
                        </div>
                    </div>
                </div>
            </Link>
    );
}
export default Card;