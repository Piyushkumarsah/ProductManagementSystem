import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Registerform() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const navigate = useNavigate();
    const callLogin = () => {
        axios.post("http://localhost:5000/Login", { email, password })
            .then(response => {
                console.log('Response Status:', response.status);
                console.log('Response Data:', response.message);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                localStorage.setItem('userToken', response.data.token);
                setErrorMessage('Success')
                navigate("/profile");
            })
            .catch((err) => {
                setErrorMessage(err.response.data.error);
            })
            .finally(() => {
                console.log("finally run")
            })
    }

    return (
        <div>
            <div className='flex  justify-center items-center border border-black h-screen'>
                <div className='w-6/12'>
                    <div className=''>
                        <h1 className='text-4xl'>Welcome</h1>
                    </div>
                    <div className='flex flex-col m-auto border border-lime-800 bg-lime-200  items-center p-24'>
                        <input className=' text-center border-2 border-black m-2' type="email" name="email" id="" value={email} onChange={(e) => { setemail(e.target.value) }} placeholder='Email' />
                        <input className=' text-center border-2 border-black m-2' type="password" placeholder='Password' value={password} onChange={(event) => { setpassword(event.target.value) }} />
                        <button className=' bg-lime-500 w-24 mt-5 border-lime-600 border-2' onClick={()=>{
                            callLogin()
                        }}>Submit</button>
                        {errorMessage && <p className='text-green-800'>{errorMessage}</p>}
                    </div>

                </div>
            </div>
        </div>
    )
}
