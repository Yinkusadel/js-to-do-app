import { nanoid } from 'nanoid';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const hideLoginPopup = () => {
  const loginPopup = document.getElementById('login-popup');
  loginPopup.style.display = 'none';
};

const displayLoginPopup = () => {
  const loginPopup = document.getElementById('login-popup');
  loginPopup.style.display = 'flex';
};

window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (isLoggedIn === 'true') {
    hideLoginPopup();
  } else {
    displayLoginPopup();
  }
});

const handleSubmit = (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();
  const errorContainer = document.getElementById('email-error');

  if (isValidEmail(email)) {
    const userId = nanoid();
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('isLoggedIn', 'true');
    hideLoginPopup();
  } else {
    errorContainer.textContent = 'Please enter a valid email address.';
  }
};

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', handleSubmit);

export default displayLoginPopup;
