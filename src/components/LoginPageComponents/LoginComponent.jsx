import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from "../Firebase/Auth";
import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Cleanup alert message to be user specific. It currently shows the error message from Firebase directly.


const LoginComponent = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.error("LoginComponent.js ==> Login Error: ", error.message);
                setError("Invalid email or password.");
            }
        },
        [email, password]
    );

    const handleSignup = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                await createUserWithEmailAndPassword(auth, email, password);
            } catch (error) {
                console.error("LoginComponent.js ==> Signup Error: ",error.message);
                if (error.code === "auth/weak-password") {
                    setError("Password is too weak.");
                } else if (error.code === "auth/password-does-not-meet-requirements") {
                    setError(
                        error.message
                        .replace("Firebase: Missing password requirements: ", "")
                        .replace("(auth/password-does-not-meet-requirements).", "")
                        .replace("[", "")
                        .replace("]", "")
                    );
                } else if (error.code === "auth/email-already-in-use") {
                    setError("Email is already in use.");
                } else {
                    setError("An unknown error occurred. Please contact support.");
                }
            }
        },
        [email, password]
    );

    const handleGoogleLogin = useCallback(
        async () => {
            try {
                const provider = new GoogleAuthProvider();
                await signInWithPopup(auth, provider);
            } catch (error) {
                console.error("LoginComponent.js ==> Google Login Error: ",error.message);
            }

        }, []
    );

    const toggleHasAccount = useCallback(() => {
        setHasAccount((prev) => !prev);
    }, []);

    // leave login page on login
    const navigate = useNavigate();
    useEffect(() => {
        const redirect = () => {
            onAuthStateChanged(auth, () =>{
                if (auth.currentUser !== null) {
                    console.info("User is logged in.");
                    navigate("/", { replace: true });
                }
            });
        }
        redirect();
    }, [navigate]);
    

    return (
        <div className="container mx-auto px-4">
            {hasAccount ? (
                <>
                    <form onSubmit={handleLogin} className="bg-white max-w-md mx-auto mt-20 p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-center mt-10 p-4 text-gray-800">Log in to your account</h1>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email address</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-400"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300 placeholder-gray-400"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm mb-6">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded font-medium hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                            Login
                        </button>
                        <p className="text-center text-gray-500 mb-6">Don't have an account? <span onClick={toggleHasAccount} className="text-blue-500 cursor-pointer hover:underline">Sign up</span></p>
                        <div className="mt-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded font-medium hover:bg-gray-100 focus:outline-none focus:ring focus:ring-red-300">
                                <span className="mr-2 text-red-500">G</span> Sign in with Google
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <form onSubmit={handleSignup} className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-lg">
                        <h1 className="text-2xl font-bold text-center mt-10 p-4 text-gray-800">Sign up</h1>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email address</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300 placeholder-gray-400"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300 placeholder-gray-400"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        {error && <div className="text-red-500 text-sm mb-6 text-pretty">{error}</div>}
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-3 rounded font-medium hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300">
                            Sign up
                        </button>
                        <p className="text-center text-gray-500 mb-6">Already have an account? <span onClick={toggleHasAccount} className="text-green-500 cursor-pointer hover:underline">Log in</span></p>
                        <div className="mt-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded font-medium hover:bg-gray-100 focus:outline-none focus:ring focus:ring-red-300">
                                <span className="mr-2 text-red-500">G</span> Sign up with Google
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default LoginComponent;