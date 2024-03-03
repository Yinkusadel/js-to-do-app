import { nanoid } from 'nanoid';

const auth = () => {
  const getLocalStorageUser = (email) => {
    const users = JSON.parse(localStorage.getItem('yukusadel-js-todo-app-users')) || [];
    if (users.length > 0) {
      return users.find((user) => user.email === email);
    }
    return null;
  };

  const addLocalStorageUser = (sessionData) => {
    const users = JSON.parse(localStorage.getItem('yukusadel-js-todo-app-users')) || [];
    users.push(sessionData);

    localStorage.setItem('yukusadel-js-todo-app-users', JSON.stringify(users));
  };

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

    const currentUser = getLocalStorageUser(email);
    if (currentUser) {
      sessionStorage.setItem('session', JSON.stringify(currentUser));
      return currentUser;
    }

    const userId = nanoid();
    const createdAt = new Date().toISOString();
    sessionData = { userId, email, createdAt };
    sessionStorage.setItem('session', JSON.stringify(sessionData));
    addLocalStorageUser(sessionData);
    return sessionData;
  };

  return { getSession, signIn, signOut };
};

export default auth();
