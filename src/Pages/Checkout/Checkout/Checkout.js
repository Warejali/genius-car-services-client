import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState({});
    const [user] = useAuthState(auth);

    useEffect(() => {
        const url = `http://localhost:5000/service/${serviceId}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data));

    }, [])

    const checkOutHandle = (event) =>{
        event.preventDefault()
        const order = {
            Services: service.name,
            ID: serviceId,
            Email: user.email,
            Address: event.target.address.value,
            Phone: event.target.phone.value,
        }
        console.log(order);
        axios.post('http://localhost:5000/order', order)
        .then(response=>{
            const {data} = response;
            if (data.insertedId) {
                toast('Thank You for Your order')
                event.target.reset()
            }
        })
    }

    return (
        <div className='mt-5'>
            <h3 className='text-center'>YOU ARE BOOKING: <span className='text-primary'>{service.name}</span></h3>
            <div className='text-center'>
                <form onSubmit={checkOutHandle} className='w-50 mx-auto'>
                    <div className="mb-3">
                        <p className='text-start'>Service Name:</p>
                        <input type="text" className="form-control" value={service.name}/>
                    </div>
                    <div className="mb-3">
                        <p className='text-start'>Name:</p>
                        <input type="text" className="form-control" value={user?.displayName}/>
                    </div>
                    <div className="mb-3">
                    <p className='text-start'>Email:</p>
                        <input type="email" className="form-control" value={user?.email}/>
                    </div>
                    <div className="mb-3">
                    <p className='text-start'>Additional Email:</p>
                        <input type="email" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3">
                        <p className='text-start'>Address:</p>
                        <input type="text" className="form-control" name='address'/>
                    </div>
                    <div className="mb-3">
                        <p className='text-start'>Phone:</p>
                        <input type="number" className="form-control" name='phone'/>
                    </div>
                    <input className='btn btn-secondary' type="submit" value="Continue to checkout" />
                </form>
            </div>
        </div>
    );
};

export default Checkout;