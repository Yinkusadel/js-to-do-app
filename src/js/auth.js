import { nanoid } from 'nanoid';

const auth = () => {
  const getSession = () => {
    const userId = sessionStorage.getItem('userId');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (userId && isLoggedIn) {
      return { userId, isLoggedIn: isLoggedIn === 'true' };
    }
    return null;
  };

  const signOut = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('isLoggedIn');
  };

  const signIn = () => {
    sessionStorage.setItem('isLoggedIn', 'true');

    if (!sessionStorage.getItem('userId')) {
      const userId = nanoid();
      sessionStorage.setItem('userId', userId);
    }
  };

  return { getSession, signIn, signOut };
};

export default auth();
