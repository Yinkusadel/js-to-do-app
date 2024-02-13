import { nanoid } from 'nanoid';
import { format } from 'date-fns';

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

  const addTodo = (todo) => {
    const newTodo = { ...todo };
    newTodo.createdAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
    return newTodo;
  };

  return { getSession, signIn, signOut, addTodo };
};

export default auth();
