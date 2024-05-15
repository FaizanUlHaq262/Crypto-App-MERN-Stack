import React, { useState } from 'react';
import axios from 'axios';

function Signup() {         //signup component
    const [formData, setFormData] = useState({          //initialize formData state with empty values
        username: '',
        email: '',
        password: '',
    });

    const { username, email, password } = formData;             //destructure username, email and password from formData and set them to variables

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });                //set form data with the input values

    const onSubmit = async e => {           //submit form function 
        e.preventDefault();         //prevent default form submission
        try {
            const newUser = {
                username,
                email,
                password,
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify(newUser);                   //convert newUser object to JSON string
            await axios.post('/api/auth/signup', body, config);     //send a POST request to /api/auth/signup with newUser data
            alert('User registered successfully');          //alert user that they are registered
        } catch (error) {           //catch any errors
            console.error(error.response.data);     //log the error to the console
            alert('User Already Exists ;)');        //alert user that they are already registered
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
                <h2 className="text-green-500 text-2xl mb-6 text-center">Sign Up</h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required className="p-3 rounded bg-gray-700 text-white placeholder-gray-300" />
                    </div>
                    <div className="flex flex-col">
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required className="p-3 rounded bg-gray-700 text-white placeholder-gray-300" />
                    </div>
                    <div className="flex flex-col">
                        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required className="p-3 rounded bg-gray-700 text-white placeholder-gray-300" />
                    </div>
                    <button type="submit" className="mt-4 p-3 bg-green-500 hover:bg-green-600 text-black font-bold rounded">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
