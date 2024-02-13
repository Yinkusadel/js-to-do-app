import auth from './auth';

const loginPopup = document.getElementById('login-popup');
const logoutButton = document.getElementById('logout-btn');
const errorContainer = document.getElementById('email-error');
const loginForm = document.getElementById('login-form');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const hideLoginPopup = () => {
  loginPopup.style.display = 'none';
};

const displayLoginPopup = () => {
  loginPopup.style.display = 'flex';
};

const handleAuthentication = () => {
  const session = auth.getSession();

  if (session && session.isLoggedIn) {
    hideLoginPopup();
  } else {
    displayLoginPopup();
  }
};

const handleLogout = () => {
  auth.signOut();
  handleAuthentication();
};

const handleSubmit = (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value.trim();

  if (isValidEmail(email)) {
    auth.signIn(email);
    hideLoginPopup();
    errorContainer.textContent = '';
  } else {
    errorContainer.textContent = 'Please enter a valid email address.';
  }
};

const initializeLoginForm = () => {
  handleAuthentication();
  logoutButton.addEventListener('click', handleLogout);
  loginForm.addEventListener('submit', handleSubmit);
};

window.addEventListener('DOMContentLoaded', initializeLoginForm);
