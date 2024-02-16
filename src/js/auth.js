import { nanoid } from 'nanoid';

const auth = () => {
  const getSession = () => JSON.parse(sessionStorage.getItem('session'));

  const signOut = () => sessionStorage.removeItem('session');

  const validEmail = (email) => {
    const goodEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!goodEmail) {
      return { error: 'Invalid email address.' };
    }
    return { error: null };
  };

  const signIn = (email) => {
    let sessionData = getSession();
    if (sessionData) {
      return { error: 'user already exist' };
    }

    const { error } = validEmail(email);
    if (error) {
      return { error };
    }

    const userId = nanoid();
    const createdAt = new Date().toISOString();
    sessionData = { userId, email, createdAt };
    sessionStorage.setItem('session', JSON.stringify(sessionData));
    return sessionData;
  };

  return { getSession, signIn, signOut };
};

export default auth();
