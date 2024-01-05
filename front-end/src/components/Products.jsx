import React, { useState } from 'react'
import axios from 'axios'
import { Typography } from '@mui/material'
export default function Products() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [company, setCompany] = useState('');
    const [quantity, setQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    if(errorMessage){
        setTimeout(() => {
            setErrorMessage('')
        }, 1000);
    }
    const clearFields = () => {
        setName('');
        setPrice('');
        setCompany('');
        setQuantity('');
        setErrorMessage('');
      };
    const addtoDb = () => {
        const userId = JSON.parse(localStorage.getItem('userData'))._id;
        axios.post('http://localhost:5000/add-products', { name, price, company,quantity, userId },{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then(response => {
                setErrorMessage('Successfully Updated')
            })
            .catch((err) => {
                alert("Session Expired: Login Again")
                setErrorMessage(err.response.data.error);
                alert(err.response.data.error)
            }
            )
    }
    return (
        <div>
            <div className='h-screen flex flex-col justify-center items-center'>
                <div className='w-6/12'>
                    <div className=''>
                        <Typography className='' color='black' fontSize='40px'>Add Product</Typography>
                    </div>
                    <div className="flex flex-col m-auto border border-lime-800 bg-lime-200  items-center p-24">
                        <input className='border-2 border-green-600 p-2 m-2 w-full text-center' type="text" placeholder='Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                        <input className='border-2  border-green-600 p-2 m-2 w-full text-center' type="Number" placeholder='Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
                        <input className='border-2  border-green-600 p-2 m-2 w-full text-center' type="text" placeholder='Company Name' value={company} onChange={(e) => { setCompany(e.target.value) }} />
                        <input className='border-2  border-green-600 p-2 m-2 w-full text-center' type="Number" placeholder='Quantity' value={quantity} onChange={(e) => { setQuantity(e.target.value) }} />
                        <button className=' bg-lime-500 w-28 mt-5 border-lime-600 border-2 rounded-md' onClick={() => {
                            addtoDb()
                        }}>Add Product</button>
                        <button className=' bg-lime-500 w-24 mt-5 border-lime-600 border-2 rounded-md' onClick={() => {
                            clearFields()
                        }}>Clear</button>
                        {
                            <div className=''>
                                {errorMessage && <p>{errorMessage}</p>}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
