import * as auth from './auth';

const { hideLoginPopup, displayLoginPopup, isValidEmail, errorContainer, logoutButton } = auth;

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
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', handleSubmit);
};

window.addEventListener('DOMContentLoaded', initializeLoginForm);
