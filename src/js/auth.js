import { nanoid } from 'nanoid';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const errorContainer = document.getElementById('email-error');

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

  if (isValidEmail(email)) {
    const userId = nanoid();
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('isLoggedIn', 'true');
    hideLoginPopup();
    errorContainer.textContent = '';
  } else {
    errorContainer.textContent = 'Please enter a valid email address.';
  }
};

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', handleSubmit);

const handleLogout = () => {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('isLoggedIn');

  displayLoginPopup();
};

const logoutButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', handleLogout);
