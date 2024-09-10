import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import './profile.css';

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        async function fetchRecentOrder() {
            try {
                // Modify the request with a payload if the server expects any data
                const requestData = {
                    userId: sessionStorage.getItem('userId') // Example payload, modify according to your needs
                };

                let response = await axios.post('http://localhost:3001/recentorder', requestData);

                if (response.status === 200) {
                    setData(response.data);
                } else {
                    toast.error(`Unexpected response code: ${response.status}`);
                }
            } catch (err) {
                if (err.response) {
                    // Server responded with a status code out of the range of 2xx
                    toast.error(`Error: ${err.response.data}. Status code: ${err.response.status}`);
                } else if (err.request) {
                    // The request was made but no response was received
                    toast.error('No response received from the server.');
                } else {
                    // Something else caused the error
                    toast.error(`Error: ${err.message}`);
                }
            }
        }
        fetchRecentOrder();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const date = new Date(data[0].createdDate);
            const dateobj = date.toDateString();
            setDate(dateobj);
        }
    }, [data]);

    const handleCancel = () => {
        toast.info("Feature not available");
    };

    return (
        <div className="centered-wrapper">
            <div className="container ">
                <div className="d-flex">
                    <i className="fas fa-user me-3 fs-1 mt-1"></i>
                    <div className="text-light-emphasis">
                        <p className="mb-0 fw-bold">{data.length > 0 ? data[0].customer_name : ""}</p>
                        <p className="mt-0">Email: {data.length > 0 ? data[0].customer_email : ""}</p>
                    </div>
                </div>
                
                <div>
                    <h1 className="fs-4">Your Recent Order</h1>
                    <div className="card ">
                        <div className="">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-light-emphasis fw-bold mb-0">Order ID : <span className="fw-normal">{data.length > 0 ? data[0].id : 0}</span></p>
                                    <p className="text-light-emphasis fw-bold mb-0">Status :&nbsp;<span className="fw-normal">{status || "Created"}</span></p>
                                    <p className="text-light-emphasis fw-bold mb-0">Date : <span className="fw-normal">{date}</span></p>
                                </div>
                                <div>
                                    <button className="btn btn-outline-danger" onClick={handleCancel}>Cancel Order</button>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex flex-1">
                                <div className="border-end me-4">
                                    <div className="me-5 text-light-emphasis">
                                        <p className="fw-bold mb-0">Contact</p>
                                        <p className="mb-0 text-capitalize">{sessionStorage.getItem('username')}</p>
                                        <p className="mb-0">Email : {sessionStorage.getItem('email')}</p>
                                    </div>
                                </div>
                                <div className="border-end me-4">
                                    <div className="me-5 text-light-emphasis">
                                        <p className="fw-bold mb-0">Shipping Details</p>
                                        <p className="mb-0 text-capitalize">M/575 Noida Sector 21,India,121001</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-light-emphasis">
                                        <p className="fw-bold mb-0">Payment</p>
                                        <p className="mb-0 text-capitalize">Method : Card</p>
                                        <p className="mb-0 text-capitalize">Amount : <span className="fw-bold text-success">Rs. {data.length > 0 ? data[0].amount : 0}</span></p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            {/* <div>
                                {
                                    data.map(item => {
                                        const images = item.img.split(',');
                                        return (
                                            <div key={item._id} className="d-flex overflow-scroll">
                                                {images.map((imgSrc, index) => (
                                                    <div className="card me-2" key={index} style={{ width: '10rem' }}>
                                                        <img src={imgSrc} className="card_img" alt="Order item" />
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    })
                                }
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
