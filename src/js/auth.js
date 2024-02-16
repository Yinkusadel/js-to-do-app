import { nanoid } from 'nanoid';

const auth = () => {
  const getSession = () => {
    const sessionData = JSON.parse(sessionStorage.getItem('session'));
    return sessionData;
  };

  const signOut = () => {
    sessionStorage.removeItem('session');
  };

  const signIn = (email) => {
    let sessionData = getSession();
    if (sessionData) {
      sessionData.email = email;
      sessionStorage.setItem('session', JSON.stringify(sessionData));
      return sessionData;
    }

    const userId = nanoid();
    const createdAt = new Date().toISOString();
    sessionData = { userId, email, createdAt };
    sessionStorage.setItem('session', JSON.stringify(sessionData));
    return sessionData;
  };

  const validEmail = (email) => {
    const goodEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!goodEmail) {
      return { error: 'Invalid email address.' };
    }
    return { error: '' };
  };

  const signUp = (email) => {
    const existingUserId = sessionStorage.getItem('session');
    if (existingUserId) {
      return getSession();
    }

    const newUserId = nanoid();
    const createdAt = new Date().toISOString();
    sessionStorage.setItem('userId', newUserId);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('createdAt', createdAt);
    return { userId: newUserId, email, createdAt };
  };

  return { getSession, signIn, signOut, signUp, validEmail };
};

export default auth();
