import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect } from 'react';
useEffect

export default function PrivateRoute({ children }) {
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        }
    });

    return () => unsubscribe();
  }, []);

  return children;
}
