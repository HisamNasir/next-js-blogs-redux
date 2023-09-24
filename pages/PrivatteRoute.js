import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect } from 'react';
useEffect

export default function PrivateRoute({ children }) {
  // You can use React hooks or a state management library like Redux to manage authentication state

  // Check the user's authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect to the login page or display an error message
        // Here, you might want to use a React context or Redux to manage the authentication state
      }
    });

    return () => unsubscribe();
  }, []);

  return children;
}
