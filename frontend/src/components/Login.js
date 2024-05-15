import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate(); // this will be used to redirect to another page
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;           //destructure email and password from formData and set them to variables

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });        //set form data with the input values

    const onSubmit = async e => {           //submit form function
        e.preventDefault();         //prevent default form submission
        try {
            const user = { email, password };           //set user object with email and password
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(user);              //convert user object to JSON string
            const response = await axios.post('/api/auth/login', body, config);         //send a POST request to /api/auth/login with user data
            login(response.data); //this contains the actual user data from backend database
            alert('User logged in successfully');           //alert user that they are logged in
            navigate('/'); //redirect to homepage after login
        } catch (error) {               //catch any errors
            console.error(error.response.data);         //log the error to the console
            alert('Error in login');
        }
    };
    
    return (
        <div className="relative min-h-screen bg-black flex justify-center items-center">
            <div className="background-grid">
                {Array.from({ length: 500 }).map((_, idx) => (
                    <span key={idx} className="background-tile"></span>
                ))}
            </div>
            <div className="w-96 bg-gray-800 p-8 rounded-lg shadow-lg z-10">
                <h2 className="text-green-500 text-2xl mb-6 text-center">Login</h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required className="p-3 rounded bg-gray-700 text-white placeholder-gray-300" />
                    </div>
                    <div className="flex flex-col">
                        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required className="p-3 rounded bg-gray-700 text-white placeholder-gray-300" />
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                        <a href="#" className="hover:text-white"></a>
                        <a href="/signup" className="text-green-500 hover:text-green-300">Signup</a>
                    </div>
                    <button type="submit" className="mt-4 p-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
