// import React from 'react'
import {useState} from 'react';
import { registerUser } from '../API/api';
import { useNavigate } from 'react-router-dom';



const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const handleChange = (e) =>{
    setFormData({...formData,
      [e.target.name] : e.target.value
    })
  }
  const navigate = useNavigate();
  // const handleSubmit = async(e) =>{
  //   e.preventDefault();
  //   try{
  //     const res = await registerUser(formData);
  //     console.log(formData);
  //     console.log(res.message)
  //     alert(res.data.message)
  //   } catch (error) {
  //     // console.error("Error registering user:", error);
  //     console.error(error.data?.message)
  //     alert(error.response?.data?.message ||"Error registering user. Please try again.");
  //   }
  // }
    const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("SUBMIT FIRED");
  console.log(formData);

  try {
    const res = await registerUser(formData);
    console.log(res);
    alert(res.message);
    if(res.success){
      navigate(res.redirectTo);
    }
    
  } catch (error) {
    console.log(error.response?.data);
    alert(error.response?.data?.message || "Error registering user. Please try again.");
  }
};
  return (
    <>
      
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input id="name" name="name" type="text" autoComplete="name" required value={formData.name}  onChange={handleChange} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register