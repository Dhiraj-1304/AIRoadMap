// import React from 'react'
import { useState } from 'react';
import { loginUser } from '../API/api';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handlechange = (e)=>{
    setFormData({...formData,
      [e.target.name] : e.target.value
    })
  }

  const navigate = useNavigate();

  const handlesubmit = async(e)=>{
    e.preventDefault();

    try{
      const res = await loginUser(formData);
      
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      console.log(res);
      alert(res.message);
      if(res.success){
        navigate(res.redirectTo);
      }

    }catch(err){
      console.log("Error logging in user:", err);
      alert(err.response?.data?.message || "Error logging in user. Please try again.");
    }

  }

  
  return (
    
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
          <form onSubmit={handlesubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" onChange={handlechange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required
                onChange={handlechange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                
              </div>
        </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login