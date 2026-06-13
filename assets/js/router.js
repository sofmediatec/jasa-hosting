document.addEventListener(
'DOMContentLoaded',

async () => {

  if(
    !isLoggedIn()
  ){

    location.href =
      'pages/login.html';

    return;

  }

  location.href =
    'pages/dashboard.html';

});
