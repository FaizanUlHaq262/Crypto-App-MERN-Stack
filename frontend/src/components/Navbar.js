import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/croppedbgSkull.png';

function Navbar() {
  const { user, logout } = useAuth(); //this will be used to get the user and logout function from the AuthContext

  return (
    <nav className='bg-black px-5 py-4 flex justify-between items-center text-green-500'>
      <div className="flex items-center">
        <img src={logo} alt="Black Crypto Logo" className="h-20 mr-5" /> 
        <h1 className='text-3xl font-bold'>Black Crypto</h1>
      </div>
      <div className="flex items-center">
        <Link to="/" className='mr-6 hover:text-green-500 transition-colors'>Home</Link>
        <Link to="/coin" className='mr-6 hover:text-green-500 transition-colors'>Coin Marketplace</Link>
        <Link to="/buy-crypto" className='mr-6 hover:text-green-500 transition-colors'>Buy Crypto</Link>
        <Link to="/about" className='mr-6 hover:text-green-500 transition-colors'>About</Link>
        {user ? (
          <>
            <span className='text-red-600 text-2xl font-bold mr-4'>{user.name}</span>
            <button onClick={logout} className='bg-transparent border-none text-green-500 hover:text-green-300 transition-colors'>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className='mr-4 hover:text-green-500 transition-colors'>Sign Up</Link>
            <Link to="/login" className='hover:text-green-500 transition-colors'>Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
