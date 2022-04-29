import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import axiosPrivate from '../../api/axiosPrivate';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        const getOrders = async() => {
            const email = user.email;
            const url = `http://localhost:5000/order?email=${email}`;

            try{
                const {data} = await axiosPrivate.get(url);
                setOrders(data)
            }
            catch(error){
                console.log(error.message);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth)
                    navigate('/login')
                }
            }
            
        }
        getOrders() 

    }, [user])
    return (
        <div className='w-50 mx-auto'>
            <h2>Total orders: {orders.length}</h2>
            <p>{user.email}</p>
        </div>
    );
};

export default Orders;