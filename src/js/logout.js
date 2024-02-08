import displayLoginPopup from './main';

const handleLogout = () => {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('isLoggedIn');

  displayLoginPopup();
};

const logoutButton = document.getElementById('logout-btn');

logoutButton.addEventListener('click', handleLogout);
