import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [ph, setph] = useState('');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData')); // Parse the data from localStorage
    if (data) {
      setName(data.name);
      setDob(data.dob);
      setEmail(data.email);
      setph(data.ph);
    }
  }, []); // Empty dependency array to run the effect only once after initial render

  return (
    <div className='border2 border bg-lime-800 h-screen flex flex-col items-center'>
      <div className='mt-5 w-full'>
      <div className='text-8xl text-white'>Welcome</div>
      <div className='flex justify-between  w-full items-center'>
        <div className='text-3xl w-full border-2 border-white-400 text-white'>Name</div>
        <div className='text-3xl w-full border-2 border-white-400 text-white'>Email</div>
        <div className='text-3xl w-full border-2 border-white-400 text-white'>Phone</div>
        <div className='text-3xl w-full border-2 border-white-400  text-white'>DateOfBirth</div>
      </div>
      <div className='flex justify-between w-full items-center'>
        <div className='text-2xl w-full border-2 border-white-400  text-white'>{name}</div>
        <div className='text-2xl w-full border-2 border-white-400 text-white'>{email}</div>
        <div className='text-2xl w-full border-2 border-white-400 text-white'>{ph}</div>
        <div className='text-2xl w-full border-2 border-white-400 text-white'>{dob}</div>
      </div>
      </div>
    </div>
  );
}
