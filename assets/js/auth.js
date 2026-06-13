function getUser(){

  const user =
    localStorage.getItem(
      STORAGE_USER
    );

  return user
    ? JSON.parse(user)
    : null;

}

function isLoggedIn(){

  return !!localStorage.getItem(
    STORAGE_TOKEN
  );

}

function logout(){

  localStorage.clear();

  location.href =
    'index.html';

}
