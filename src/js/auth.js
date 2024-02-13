import { nanoid } from 'nanoid';

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const errorContainer = document.getElementById('email-error');
export const logoutButton = document.getElementById('logout-btn');
export const loginPopup = document.getElementById('login-popup');

export const getSession = () => {
  const userId = sessionStorage.getItem('userId');
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (userId && isLoggedIn) {
    return { userId, isLoggedIn: isLoggedIn === 'true' };
  }
  return null;
};

export const signOut = () => {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('isLoggedIn');
};

export const signIn = (email) => {
  if (!isValidEmail(email)) {
    errorContainer.textContent = 'Please enter a valid email address.';
    return;
  }

  sessionStorage.setItem('isLoggedIn', 'true');

  if (!sessionStorage.getItem('userId')) {
    const userId = nanoid();
    sessionStorage.setItem('userId', userId);
  }
};

export const hideLoginPopup = () => {
  loginPopup.style.display = 'none';
};

export const displayLoginPopup = () => {
  loginPopup.style.display = 'flex';
};
