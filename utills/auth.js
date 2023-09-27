import { auth } from "../firebase";

export const checkAuth = async () => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // Unsubscribe to prevent memory leaks
      resolve(user);
    });
  });
};
