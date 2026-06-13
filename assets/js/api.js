async function apiRequest(
  action,
  payload = {}
){

  const token =
    localStorage.getItem(
      STORAGE_TOKEN
    );

  const body = {

    action,

    token,

    ...payload

  };

  const response =
    await fetch(
      API_URL,
      {
        method:'POST',

        headers:{
          'Content-Type':
          'text/plain'
        },

        body:
        JSON.stringify(body)
      }
    );

  return await response.json();

}
