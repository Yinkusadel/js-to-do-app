const authUi = (auth) => {
  const loginPopup = document.getElementById('login-popup');
  const errorContainer = document.getElementById('email-error');

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
      return true;
    }
    displayLoginPopup();
    return false;
  };

  const handleLogout = (event) => {
    event.preventDefault();

    auth.signOut();
    handleAuthentication();
  };

  const handleLogin = () => {
    const email = document.getElementById('email').value.toLowerCase().trim();

    const { error } = auth.signIn(email);
    if (error) {
      errorContainer.textContent = error;
      return false;
    }

    hideLoginPopup();
    errorContainer.textContent = '';
    return true;
  };
  return { handleAuthentication, handleLogin, handleLogout };
};

export default authUi;
