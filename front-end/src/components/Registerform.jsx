import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Registerform() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState(null);
    const [ph, setPh] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate();
    const callRegister = () => {
        axios.post('http://localhost:5000/Register', { name, dob, ph, email, password })
            .then(response => {
                console.log('Response Status:', response.status);
                console.log('Response Data:', response.data);
                localStorage.setItem('userData', JSON.stringify(response.data.data));
                alert("User registered successfully");
                navigate('/profile',name);
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 400) {
                    setErrorMessage(err.response.data.error);
                    alert(err.response.data.error); 
                } else {
                    // Handle other types of errors
                    alert("Failed to register user. Please try again later.");
                }
            });
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='w-6/12'>
                <div>
                    <h1 className='text-4xl flex flex-col items-center p-2'>Register Now</h1>
                </div>
                <div className='flex flex-col border border-lime-800 bg-lime-200 items-center p-24'>
                    <input className=' text-center border-2 border-black m-2 w-full' type="text" placeholder='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input className=' text-center border-2 border-black m-2 w-full' type="date" placeholder='Date of Birth' value={dob} onChange={(e) => { setDob(e.target.value) }} />
                    <input className=' text-center border-2 border-black m-2 w-full' type="number" placeholder='Phone Number' value={ph} onChange={(e) => { setPh(e.target.value) }} />
                    <input className=' text-center border-2 border-black m-2 w-full' type="email" name="email" id="" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                    <input className=' text-center border-2 border-black m-2 w-full' type="password" placeholder='Password' value={password} onChange={(event) => {setPassword(event.target.value) }} />
                    <button className='bg-lime-500 w-24 mt-5 border-lime-600 border-2' onClick={() => {
                        callRegister();
                    }}>Submit</button>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                </div>
            </div>
        </div>
    )
}
