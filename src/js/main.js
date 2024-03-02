import auth from './auth';
import authUi from './authUi';
import startUpTodo from './todo';

const logoutButton = document.getElementById('logout-btn');
const loginForm = document.getElementById('login-form');

const authentication = authUi(auth);

const initializeLoginForm = () => {
  const isLoggedIn = authentication.handleAuthentication();
  if (isLoggedIn) {
    startUpTodo();
  }

  logoutButton.addEventListener('click', authentication.handleLogout);
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    authentication.handleLogin(event);
  });
};

window.addEventListener('DOMContentLoaded', initializeLoginForm);
