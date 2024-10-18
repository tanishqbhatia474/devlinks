'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: 'http://localhost:3000/' });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login with Google</h1>
      <button
        onClick={handleGoogleSignIn}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        Sign in with Google
      </button>
    </div>
  );
}
