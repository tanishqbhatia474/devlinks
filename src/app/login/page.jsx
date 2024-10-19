'use client';

import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [isBlack, setIsBlack] = useState(false); // State to track background color

  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: 'https://devlinks-ruddy-two.vercel.app/' });
  };

  useEffect(() => {
    const changeColorInterval = setInterval(() => {
      setIsBlack(prev => !prev); // Toggle the background color state
    }, 1000); // Change every 0.2 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(changeColorInterval);
  }, []);

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${isBlack ? 'bg-black' : 'bg-pink-600'}`}>
      <h1 className={`text-5xl md:text-9xl font-bold ${isBlack ? 'text-pink-600' : 'text-black-800'} mb-2`}>
        DevLinks
      </h1>
      <p className="text-md md:text-lg text-gray-600 mb-6 text-center">Login to access your dashboard</p>
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
}
