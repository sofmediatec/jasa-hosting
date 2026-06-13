/**
 * ==========================================
 * API Client V2
 * ==========================================
 */

async function apiRequest(
  action,
  payload = {},
  method = 'POST'
){

  try{

    const token =
      localStorage.getItem(
        STORAGE_TOKEN
      );

    let response;

    if(method === 'GET'){

      const params =
        new URLSearchParams({

          action,

          token,

          ...payload

        });

      response =
        await fetch(
          `${API_URL}?${params}`
        );

    }else{

      const body = {

        action,

        token,

        ...payload

      };

      response =
        await fetch(
          API_URL,
          {

            method:'POST',

            headers:{
              'Content-Type':
              'text/plain'
            },

            body:
            JSON.stringify(
              body
            )

          }

        );

    }

    const result =
      await response.json();

    /*
    ======================
    Session Expired
    ======================
    */

    if(

      result.message ===
      'Token tidak valid'

      ||

      result.message ===
      'Session expired'

    ){

      localStorage.clear();

      alert(
        'Session telah berakhir'
      );

      window.location.href =
        'login.html';

      return null;

    }

    return result;

  }catch(err){

    console.error(
      'API ERROR:',
      err
    );

    return {

      success:false,

      message:
      err.message

    };

  }

}
