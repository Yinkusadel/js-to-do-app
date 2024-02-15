// import { nanoid } from 'nanoid';

// const auth = () => {
//   const getSession = () => {
//     const userId = sessionStorage.getItem('userId');
//     const email = sessionStorage.getItem('email');
//     const date = new Date().toISOString();
//     sessionStorage.setItem('createdAt', date);

//     if (userId) {
//       return { userId, email, createdAt: date };
//     }
//     return null;
//   };

//   const signOut = () => {
//     sessionStorage.removeItem('userId');
//     sessionStorage.removeItem('email');
//     sessionStorage.removeItem('createdAt');
//   };

// const signIn = (email) => {
//   let userId = sessionStorage.getItem('userId');

//   if (!userId) {
//     userId = nanoid();
//     sessionStorage.setItem('userId', userId);
//   }

//   sessionStorage.setItem('email', email);
// };

//   return { getSession, signIn, signOut };
// };

// export default auth();

// import { nanoid } from 'nanoid';
// const createdAt = new Date().toISOString();
// const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// const auth = () => {
// const getSession = () => {
//   const { userId, email } = sessionStorage;
//   sessionStorage.setItem('createdAt', createdAt);

//   if (userId) {
//     return { userId, email, createdAt };
//   }
//   return null;
// };

// const signOut = () => {
//   sessionStorage.removeItem('userId','email','createdAt');
// };

// const signIn = (email) => {
//   let userId = sessionStorage.getItem('userId');
//   if (!isValidEmail(email)) {
//     return { error: 'Invalid email address.' };
//   }
//   else if (isValidEmail && userId) {
//     const sessionData = {
//       userId: userId,
//       email: email,
//       createdAt: createdAt
//     };
//     sessionStorage.setItem('session', sessionData);
//     return sessionData;
//   }

//   return { error: 'Please sign up.' };
// };

//   const signUp = (email) => {
//     const existingUserId = sessionStorage.getItem('userId');
//     if (existingUserId) {
//       return { error: 'User already exists.' };
//     }

//     const newUserId = nanoid();
//     sessionStorage.setItem('userId', newUserId);
//     sessionStorage.setItem('email', email);
//     sessionStorage.setItem('createdAt', createdAt);

//     return { userId: newUserId, email, createdAt: createdAt };
//   };

//   return { getSession, signIn, signOut,signUp };
// };

// export default auth();

import { nanoid } from 'nanoid';

const auth = () => {
  const createdAt = new Date().toISOString();

  const getSession = () => {
    const userId = sessionStorage.getItem('userId');
    const email = sessionStorage.getItem('email');
    const createdAtFromStorage = sessionStorage.getItem('createdAt');

    if (userId) {
      return { userId, email, createdAt: createdAtFromStorage };
    }
    return null;
  };

  const signOut = () => {
    sessionStorage.removeItem('userId', 'email', 'createdAt');
  };

  const signIn = (email) => {
    let userId = sessionStorage.getItem('userId');

    if (userId && sessionStorage.getItem('email') === email) {
      const sessionData = {
        userId,
        email,
        createdAt,
      };
      sessionStorage.setItem('session', JSON.stringify(sessionData));
      return sessionData;
    }

    userId = nanoid();
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('createdAt', createdAt);
    return {
      userId,
      email,
      createdAt,
    };
  };

  const validEmail = (email) => {
    const goodEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!goodEmail) {
      return { error: 'Invalid email address.' };
    }
    return { error: '' };
  };

  const signUp = (email) => {
    const existingUserId = sessionStorage.getItem('userId');
    if (existingUserId) {
      return { error: 'User already exists.' };
    }

    const newUserId = nanoid();
    sessionStorage.setItem('userId', newUserId);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('createdAt', createdAt);

    return { userId: newUserId, email, createdAt };
  };

  return { getSession, signIn, signOut, signUp, validEmail };
};

export default auth();
