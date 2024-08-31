
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './Checkoutform';
import './Addbooks.css'
import { toast, ToastContainer } from 'react-toastify';
import { pink } from '@mui/material/colors';

const pincode_initial_value = {
    title: '',
    pincode: '',
    author: ''
}

const Carddetail = () => {
    const [stripePromise, setStripePromise] = useState(null);
    const [price, setPrice] = useState(0);
    const { id } = useParams();
    const location = useLocation();
    const { email, username } = location.state || {}
    const [data, setData] = useState();
    const [cart, setCart] = useState();
    const [response, setResponse] = useState("")
    const [pincode, setPincode] = useState(pincode_initial_value);
    // console.log(id)
    console.log("carddetails", email, username)

    const handleCart = async () => {
        console.log(data);
        try {
            if (data) {
                const user=sessionStorage.getItem('username');
                const response = await axios.post('http://localhost:3001/addtocart/save', {data,user});
                if (response.status === 200) {
                    toast.success(response.data);
                }
            }
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    async function savedata(){
        
    }

    useEffect(() => {
        const fetchdata = async () => {
            let result = await axios.get(`http://localhost:3001/bookdata?id=${id}`);
            setData(result.data);
            const parsedPrice = parseFloat(result.price);
            setPrice(parsedPrice);
            console.log(result.data)
            console.log(data);
        }
        const fetchStripe = async () => {
            const stripe = await loadStripe('pk_test_51PY8KTRsGojz0TAjzERUuHclxlZZ9GgQzd8rezCdrYY1ObO0387f04cFvMUhDjzvWh1bFClSQBjiVmWOND4Qnlku00ivR8BMXj');
            setStripePromise(() => stripe);
        };
        fetchdata();
        fetchStripe();
    }, [id]);


    const handlePincode = async (e) => {
        e.preventDefault();
        try {
            let response = await axios.post('http://localhost:3001/pincode', { pincode });
            console.log(response)
            if (response.status === 200) {
                toast.success("done")
            }
            else {
                setResponse(response.data)
                toast.info(response.data)
                setPincode(pincode_initial_value)
            }

        }
        catch (err) {
            toast.error(err.message)
        }
    }


    const handlePincodeChange = (e) => {
        if (pincode.pincode.length <= 6) {
            setPincode({ ...pincode, [e.target.name]: e.target.value, title: data.title, author: data.author });
        }
        else {
            toast.error('Invalid Pincode', { autoClose: 2000 });
            setTimeout(() => {
                setPincode(pincode_initial_value);
            }, (2000))
        }
    }


    const handlePayment = () => {
        try {
            ReactDOM.render(
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={data.price} email={email} username={username} title={data.title} author={data.author} img={data.url1} />
                </Elements>,
                document.getElementById('checkout-form-container')
            );
        } catch (error) {
            toast.error('Error rendering CheckoutForm:', error);
        }
    };

    return (
        data && (
            <div className="container-fluid mt-1 mb-5 min-vh-100">
                <div className="row g-0 mt-5 d-sm-flex d-md-flex ">
                    <div className="col-3 me-auto ms-auto mb-md-5 mb-sm-5" style={{ width: '273px' }}>
                        <img
                            src={data.url2}
                            alt="Book Cover"
                            className="img-fluid border"
                            width='300px'
                            height='auto'
                        />
                    </div>
                    <div className="col-6 ms-auto me-auto mb-md-5 mb-sm-5 small ">
                        <h2>{data.title}</h2>
                        <p>{data.subtitle}</p>
                        <div className='d-flex flex-row' style={{ fontSize: '10px' }}>
                            <p>Author: {data.author}</p>
                            <p>|</p>
                            <p>Format: Hardcover</p>
                            <p>|</p>
                            <p>Genre : {data.genre} </p>
                        </div>
                        <hr />
                        <div>
                            <p>{data.description}</p>
                        </div>
                        <div>
                            <button className='btn btn-outline-primary p-2 width_small'>Hardcover: Rs.{data.price}</button>
                        </div>
                        <div className='mt-4 fw-bold'>
                            Access Notes On
                        </div>
                        <hr />
                        <div>
                            <a href={data.pdf} className='me-3 text-primary-emphasis' target='_blank' rel='noopener noreferrer'>
                                NOTES
                            </a>
                            <a href={data.pyq} className='me-3 text-primary-emphasis' target='_blank' rel='noopener noreferrer'>
                                Previous Year Questions
                            </a>
                            <a href={data.faq} className='me-3 text-primary-emphasis' target='_blank' rel='noopener noreferrer'>
                                Frequently Asked Questions
                            </a>
                            <a href={data.ivq} className='me-3 text-primary-emphasis' target='_blank' rel='noopener noreferrer'>
                                Interview Questions
                            </a>
                        </div>
                    </div>
                    <div className="col-3 border border-2 ms-auto me-auto small" id="checkout-form-container" style={{ width: '350px' }}>
                        <div>
                            <div className='d-flex flex-row me-3 ms-3 mt-4'>
                                <p className='me-2 text-dark m-2 fw-bold'>Hardcover</p>
                                <p className='text-danger fs-4 fw-bold'>Rs. {data.price}</p>
                            </div>
                            <p className='ms-4 mt-0 fw-light' style={{ fontSize: '14px' }}>Inclusive of all Taxes</p>
                            <div className='border border-success border-2 m-auto rounded p-3' style={{ width: '310px', background: '#f8fff9' }}>
                                <p className='fs-5 fw-bold'>Delivery</p>
                                <div className='d-flex flex-row'>
                                    <input type='text' className='form-control no-border w-75' name="pincode" onChange={handlePincodeChange} value={pincode.pincode} placeholder='Pincode' maxLength={6} />
                                    <button className='btn btn-warning w-25 p-0' onClick={handlePincode}><span className="ms-auto me-auto fw-bold" style={{ fontSize: '10px' }}>Check</span></button>
                                </div>
                                <hr />
                                <div>
                                    <p className='text-success fw-bold mt-4 ms-4 me-4' style={{ fontSize: '15px' }}>{response ? response : 'Estimated Delivery In 2 Days'}</p>
                                    <p className='text-dark fw-normal mb-0 ms-4 me-4' style={{ fontSize: '14px' }}>Enter Pincode to check Availability</p>
                                    <ToastContainer></ToastContainer>
                                </div>
                            </div>
                            <div className='m-4'>
                                <button className='btn btn-outline-danger rounded-pill mb-3 ms-auto me-auto' onClick={handleCart} style={{ padding: '14px 40px 12px' }}>ADD TO CART</button>
                                <button className='btn btn-outline-danger rounded-pill mb-4 ms-auto me-auto' onClick={handlePayment} style={{ padding: '14px 40px 12px' }}>BUY NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

export default Carddetail;
