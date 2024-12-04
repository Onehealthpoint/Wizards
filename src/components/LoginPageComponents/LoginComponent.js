import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useState, useCallback } from 'react';

// Cleanup alert message to be user specific. It currently shows the error message from Firebase directly.

const LoginComponent = ({auth}) => {
    const [hasAccount, setHasAccount] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
                console.log(user);
            } catch (error) {
                console.error(error.message);
                alert(error.message);
            }
        },
        [auth, email, password]
    );

    const handleSignup = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user);
            } catch (error) {
                console.error(error.message);
                alert(error.message);
            }
        },
        [auth, email, password]
    );

    const handleGoogleLogin = useCallback(
        async () => {
            try {
                const provider = new GoogleAuthProvider();
                const user = await signInWithPopup(auth, provider);
                console.log(user);
            } catch (error) {
                console.error(error.message);
                alert(error.message);
            }
        }, 
        [auth]
    );

    const toggleHasAccount = useCallback(() => {
        setHasAccount((prev) => !prev);
    }, []);

    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-2xl font-bold text-center mt-10">Login Page</h1>
            </div>
            {hasAccount ?
                <>
                    <h2>LoginIn</h2>
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input 
                            className=""
                            type="email" 
                            name="email" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}/>
                        <label htmlFor="password">password</label>
                        <input 
                            className=""
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                        <button type="submit">Submit</button>
                    </form>  
                    <button onClick={toggleHasAccount}>Goto Signup</button>      
                </>
            :
                <>
                    <h2>SignUp</h2>
                    <form onSubmit={handleSignup}>
                        <label htmlFor="email">Email</label>
                        <input 
                            className=""
                            type="email" 
                            name="email" 
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}/>
                        <label htmlFor="password">password</label>
                        <input 
                            className=""
                            type="password" 
                            name="password" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}/>
                        <button type="submit">Submit</button>
                    </form>
                    <button onClick={toggleHasAccount}>Goto Login</button>  
                </>
            }
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </>
    );
};

export default LoginComponent;