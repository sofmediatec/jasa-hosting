function showLoading(){

  const el =
    document.getElementById(
      'loadingOverlay'
    );

  if(el){

    el.classList.remove(
      'hidden'
    );

  }

}

function hideLoading(){

  const el =
    document.getElementById(
      'loadingOverlay'
    );

  if(el){

    el.classList.add(
      'hidden'
    );

  }

}
