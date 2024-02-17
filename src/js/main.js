import auth from './auth';

const loginPopup = document.getElementById('login-popup');
const logoutButton = document.getElementById('logout-btn');
const errorContainer = document.getElementById('email-error');
const loginForm = document.getElementById('login-form');

const hideLoginPopup = () => {
  loginPopup.classList.replace('flex', 'hidden');
};

const displayLoginPopup = () => {
  loginPopup.classList.replace('hidden', 'flex');
};

const handleAuthentication = () => {
  const session = auth.getSession();

  if (session) {
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

  const email = document.getElementById('email').value.toLowerCase().trim();

  const { error } = auth.signIn(email);
  if (error) {
    errorContainer.textContent = error;
    return;
  }

  hideLoginPopup();
  errorContainer.textContent = '';
};

const initializeLoginForm = () => {
  handleAuthentication();
  logoutButton.addEventListener('click', handleLogout);
  loginForm.addEventListener('submit', handleSubmit);
};

window.addEventListener('DOMContentLoaded', initializeLoginForm);
