import { useState } from 'react';
import { X } from 'lucide-react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const LoginModal = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const requiredEnv = [
        import.meta.env.VITE_FIREBASE_API_KEY,
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        import.meta.env.VITE_FIREBASE_PROJECT_ID,
        import.meta.env.VITE_FIREBASE_APP_ID,
      ];

      if (requiredEnv.some((value) => !value)) {
        setMessage('Configuration error: Firebase env variables not set. Please contact administrator.');
        setIsLoading(false);
        return;
      }

      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        if (formData.name) {
          await updateProfile(userCredential.user, { displayName: formData.name });
        }

        // Log registration to Google Sheets (fire-and-forget background task)
        const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
        if (GOOGLE_SCRIPT_URL) {
          fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: JSON.stringify({
              name: formData.name || "Community Member",
              email: formData.email,
              phone: "",
              type: "login",
              subject: "Community Account Registration",
              message: "User signed up via standard registration form."
            }),
          }).catch((err) => console.error("Error logging signup to Google Sheets:", err));
        }

        setMessage('✓ Account created successfully.');
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        setMessage('✓ Logged in successfully.');
      }

      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', password: '' });
      }, 1200);
    } catch (error) {
      console.error('Error:', error);
      setMessage(error?.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const requiredEnv = [
        import.meta.env.VITE_FIREBASE_API_KEY,
        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        import.meta.env.VITE_FIREBASE_PROJECT_ID,
        import.meta.env.VITE_FIREBASE_APP_ID,
      ];

      if (requiredEnv.some((value) => !value)) {
        setMessage('Configuration error: Firebase env variables not set. Please contact administrator.');
        setIsLoading(false);
        return;
      }

      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      // Log Google Login/Signup to Google Sheets (fire-and-forget background task)
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (GOOGLE_SCRIPT_URL && userCredential.user) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            name: userCredential.user.displayName || "Google User",
            email: userCredential.user.email || "",
            phone: userCredential.user.phoneNumber || "",
            type: "login",
            subject: "Community Account Login (Google)",
            message: "User logged in/signed up using Google Auth."
          }),
        }).catch((err) => console.error("Error logging Google login to Google Sheets:", err));
      }

      setMessage('✓ Logged in with Google.');

      setTimeout(() => {
        onClose();
        setFormData({ name: '', email: '', password: '' });
      }, 1200);
    } catch (error) {
      console.error('Error:', error);
      setMessage(error?.message || 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#800000]">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {isSignUp
              ? 'Sign up to join the community'
              : 'Log in to continue'}
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-4 p-3 rounded-lg text-center text-sm ${
              message.includes('✓')
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#b31b1b] hover:bg-[#8a1515] text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? 'Please wait...'
              : isSignUp
                ? 'Create Account'
                : 'Log In'}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue with Google
          </button>
        </div>

        <div className="mt-5 text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp((prev) => !prev)}
            className="text-[#b31b1b] hover:text-[#8a1515] font-medium"
          >
            {isSignUp ? 'Log in' : 'Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
