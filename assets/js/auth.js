function saveAuth(data){

  localStorage.setItem(
    STORAGE_TOKEN,
    data.token
  );

  localStorage.setItem(
    STORAGE_USER,
    JSON.stringify(
      data.user
    )
  );

  if(data.refresh_token){

    localStorage.setItem(
      STORAGE_REFRESH,
      data.refresh_token
    );

  }

}

function getToken(){

  return localStorage.getItem(
    STORAGE_TOKEN
  );

}

function getUser(){

  return JSON.parse(

    localStorage.getItem(
      STORAGE_USER
    ) || '{}'

  );

}

function isLoggedIn(){

  return !!getToken();

}

function requireAuth(){

  if(
    !isLoggedIn()
  ){

    window.location.href =
      'login.html';

  }

}

function logout(){

  localStorage.removeItem(
    STORAGE_TOKEN
  );

  localStorage.removeItem(
    STORAGE_USER
  );

  localStorage.removeItem(
    STORAGE_REFRESH
  );

  window.location.href =
    'login.html';

}
