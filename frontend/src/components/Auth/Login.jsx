import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, handleGoogleSignIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await handleGoogleSignIn(credentialResponse.credential);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error.message);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Sign In was unsuccessful. Try again later');
    console.log(error);
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login to SyncVision</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Login
            </button>
          </form>
          <div className="mt-4 w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              useOneTap
              type="standard"
              size="large"
              text="signin_with"
              shape="rectangular"
              theme="outline"
              width="383px"
            />
          </div>
          <p className="mt-4 text-center">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
