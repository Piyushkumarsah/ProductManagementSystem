import axios from 'axios';
import { useState, useEffect } from 'react';

export default function List() {
    const [products, setProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState('');
    const [deleteItem, setDeleteItem] = useState('');
    const [editedProduct, setEditedProduct] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const getList = () => {
        axios.get('http://localhost:5000/getproductlist', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((response) => {
                const responseData = response.data;

                if (responseData.error) {
                    setErrorMessage(responseData.error);
                } else {
                    setProducts(responseData);
                }
            })
            .catch((err) => {
                alert("Session Expired:")
                console.error('Something went wrong:', err);
                setErrorMessage('Error fetching data');
            });
    };

    useEffect(() => {
        getList();
    }, []);

    const handleEdit = (item, edit) => {
        if (edit === 1) {
            setEditItem(item);
            setEditedProduct(item)
        }
        else {
            setEditItem('')
        }
    };

    const handleSave = () => {
        axios.put(`http://localhost:5000/updateproduct`, editedProduct, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })
            .then((response) => {
                getList();
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };
    const Deletion = (item) => {
        setDeleteItem(item)
        setConfirmDelete(true)
    }
    const deleteProduct = (item) => {

        axios.delete('http://localhost:5000/deleteproduct', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            data: {
                itemId: item._id
            }
        })
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error, "response error")
                }
                else
                    getList();
            }
            )
            .catch((err) => {
                console.log("token problem", err);
            }
            )

    }



    return (
        <div>
            <div className='flex justify-center h-screen'>
                <div className='w-screen'>
                    <div className=''>
                        {
                            !editMode ?
                                <div className=' m-2 float-right z-10 hover:scale-105'><button className='border-2 w-24 border-lime-800 bg-green-500' onClick={() => setEditMode(true)}>EDIT LIST</button>
                                </div>
                                :
                                <div className=' m-2 float-right z-10 hover:scale-105'><button className='border-2 w-24 border-lime-800 bg-green-500' onClick={() => setEditMode(false)}>STOP...</button>
                                </div>
                        }
                        <div className='text-4xl ml-24 '>Product List</div>
                    </div>
                    <div>
                        <ul className='mt-2 flex justify-between bg-lime-500'>
                            <div className='border-2 w-full'><li>SNo.</li></div>
                            <div className='border-2 w-full'><li>Name</li></div>
                            <div className='border-2 w-full'><li>Price ($)</li></div>
                            <div className='border-2 w-full'><li>Company</li></div>
                            <div className='border-2 w-full'><li>Quantity</li></div>
                            {
                                editMode &&
                                <div>
                                    <div className='w-28 border-2'>
                                        <li className='w-full'>Operation</li>
                                    </div>
                                </div>
                            }
                        </ul>
                        {products.map((item, i) => (
                            <>
                                <ul className='flex justify-between bg-lime-200' key={i}>
                                    <div className='border-2 w-full'><li>{i + 1}</li></div>
                                    <div className='border-2 w-full'><li>{item.name}</li></div>
                                    <div className='border-2 w-full'><li>{item.price}</li></div>
                                    <div className='border-2 w-full'><li>{item.company}</li></div>
                                    <div className='border-2 w-full'><li>{item.quantity}</li></div>
                                    {
                                        editMode &&
                                        <div>
                                            <div className='flex'>
                                                {
                                                    !(editItem === item) ?
                                                        <button className='w-14 border bg-blue-300 hover:scale-110' onClick={() => editMode && handleEdit(item, 1)}>Edit</button>
                                                        :
                                                        <button className='w-14 border bg-blue-300 hover:scale-110' onClick={() => editMode && handleEdit(item, 0)}>Cancel</button>
                                                }
                                                <button className='w-14 border  bg-blue-300 hover:scale-110' onClick={() => editMode && Deletion(item)}>Delete</button>
                                            </div>
                                        </div>
                                    }
                                </ul>
                                {
                                    confirmDelete && item === deleteItem &&
                                    <div>
                                        <div className='bg-red-400 flex items-center justify-center'>
                                            <button className='bg-blue-300  w-24 m-2' onClick={()=>deleteProduct(item)}>Confirm</button>
                                            <button className='bg-blue-300  w-24 m-2 ' onClick={() => setConfirmDelete(false)}>Cancel</button>
                                        </div>
                                    </div>
                                }
                                {editMode && editItem === item && (
                                    <>
                                        <ul className='border-2 border-cyan-500 flex justify-between bg-lime-500'>
                                            <div className='border-2 w-full'><li>{i + 1}</li></div>
                                            <input className='border-2 w-full text-center' type="text" value={editedProduct.name} onChange={(e) => { setEditedProduct({ ...editedProduct, name: e.target.value }) }} />
                                            <input className='border-2 w-full text-center' type="number" value={editedProduct.price} onChange={(e) => { setEditedProduct({ ...editedProduct, price: e.target.value }) }} />
                                            <input className='border-2 w-full text-center' type="text" value={editedProduct.company} onChange={(e) => { setEditedProduct({ ...editedProduct, company: e.target.value }) }} />
                                            <input className='border-2 w-full text-center' type="number" value={editedProduct.quantity} onChange={(e) => { setEditedProduct({ ...editedProduct, quantity: e.target.value }) }} />
                                            <div><div className='border-2 w-28'><button className='bg-red-300 border-2 border-red-700 w-full' onClick={() => { handleSave() }}>UPDATE</button></div></div>
                                        </ul>
                                    </>
                                )}
                            </>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
