import { nanoid } from 'nanoid';

const auth = () => {
  const getSession = () => {
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const date = new Date().toISOString();
    sessionStorage.setItem('createdAt', date);

    if (userId) {
      return { userId, email, createdAt: date };
    }
    return null;
  };

  const signOut = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('createdAt');
  };

  const signIn = (email) => {
    let userId = sessionStorage.getItem('userId');

    if (!userId) {
      userId = nanoid();
      sessionStorage.setItem('userId', userId);
    }

    sessionStorage.setItem('email', email);
  };

  return { getSession, signIn, signOut };
};

export default auth();
