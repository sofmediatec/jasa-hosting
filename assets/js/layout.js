async function loadComponent(
  elementId,
  path
){

  const html =
    await fetch(path)
    .then(
      res => res.text()
    );

  document
  .getElementById(
    elementId
  )
  .innerHTML = html;

}

async function initLayout(){

  await loadComponent(
    'navbarContainer',
    '../components/navbar.html'
  );

  await loadComponent(
    'sidebarContainer',
    '../components/sidebar.html'
  );

  await loadComponent(
    'footerContainer',
    '../components/footer.html'
  );

  const user =
    JSON.parse(
      localStorage.getItem(
        STORAGE_USER
      ) || '{}'
    );

  setTimeout(()=>{

    const navbarUser =
      document.getElementById(
        'navbarUser'
      );

    if(navbarUser){

      navbarUser.innerText =
        user.name || '-';

    }

    const role =
      document.getElementById(
        'sidebarRole'
      );

    if(role){

      role.innerText =
        user.role || '-';

    }

    setupRoleMenu(
      user.role
    );

  },300);

}

function setupRoleMenu(role){

  if(role !== 'admin'){

    document
    .querySelectorAll(
      '.admin-only'
    )
    .forEach(
      e=>e.remove()
    );

  }

  if(role !== 'reseller'){

    document
    .querySelectorAll(
      '.reseller-only'
    )
    .forEach(
      e=>e.remove()
    );

  }

}
