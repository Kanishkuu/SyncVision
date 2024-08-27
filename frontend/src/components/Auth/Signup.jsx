import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();
  const { signup, handleGoogleSignIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ username, email, password, gender });
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error.message);
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
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign up for SyncVision</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
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
            <div className="flex items-center mb-4">
              <label className="mr-4">
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                  className="mr-2"
                />
                Female
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Sign Up
            </button>
          </form>
          <div className="mt-4">
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
          <p className="mt-4 text-center">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
