/**
 * ==========================================
 * Layout V2
 * Role Based Sidebar
 * ==========================================
 */

const MENUS = {

  admin:[

    {
      text:'Dashboard',
      url:'dashboard.html'
    },

    {
      text:'Services',
      url:'services.html'
    },

    {
      text:'Packages',
      url:'packages.html'
    },

    {
      text:'Users',
      url:'users.html'
    },

    {
      text:'Orders',
      url:'orders.html'
    },

    {
      text:'Invoices',
      url:'invoices.html'
    },

    {
      text:'Payments',
      url:'payments.html'
    },

    {
      text:'Approvals',
      url:'approvals.html'
    },

    {
      text:'Logs',
      url:'logs.html'
    },

    {
      text:'Notifications',
      url:'notifications.html'
    }

  ],

  reseller:[

    {
      text:'Dashboard',
      url:'dashboard.html'
    },

    {
      text:'Orders',
      url:'orders.html'
    },

    {
      text:'Invoices',
      url:'invoices.html'
    },

    {
      text:'Payments',
      url:'payments.html'
    },

    {
      text:'Commissions',
      url:'commissions.html'
    },

    {
      text:'Withdrawals',
      url:'withdrawals.html'
    },

    {
      text:'Notifications',
      url:'notifications.html'
    }

  ],

  member:[

    {
      text:'Dashboard',
      url:'dashboard.html'
    },

    {
      text:'Orders',
      url:'orders.html'
    },

    {
      text:'Invoices',
      url:'invoices.html'
    },

    {
      text:'Payments',
      url:'payments.html'
    },

    {
      text:'Notifications',
      url:'notifications.html'
    }

  ]

};

/**
 * Load Component
 */
async function loadComponent(
  elementId,
  path
){

  try{

    const html =
      await fetch(path)
      .then(
        res => res.text()
      );

    const el =
      document.getElementById(
        elementId
      );

    if(el){

      el.innerHTML =
        html;

    }

  }catch(err){

    console.error(
      'Load Component Error:',
      err
    );

  }

}

/**
 * Init Layout
 */
async function initLayout(){

  requireAuth();

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
    getUser();

  setTimeout(()=>{

    initUserInfo(
      user
    );

    buildSidebar(
      user.role
    );

  },200);

}

/**
 * User Info
 */
function initUserInfo(
  user
){

  const navbarUser =
    document.getElementById(
      'navbarUser'
    );

  if(navbarUser){

    navbarUser.innerText =
      user.name || '-';

  }

  const sidebarRole =
    document.getElementById(
      'sidebarRole'
    );

  if(sidebarRole){

    sidebarRole.innerText =
      user.role || '-';

  }

}

/**
 * Build Sidebar
 */
function buildSidebar(
  role
){

  const menuContainer =
    document.getElementById(
      'sidebarMenu'
    );

  if(!menuContainer){

    return;

  }

  const menus =
    MENUS[role] || [];

  let html = '';

  menus.forEach(menu=>{

    html +=
    `
    <a
      href="${menu.url}"
      class="block px-4 py-3 hover:bg-slate-800 border-b border-slate-800">

      ${menu.text}

    </a>
    `;

  });

  html +=
  `
  <a
    href="profile.html"
    class="block px-4 py-3 hover:bg-slate-800 border-b border-slate-800">

    Profile

  </a>

  <a
    href="#"
    onclick="logout()"
    class="block px-4 py-3 text-red-400">

    Logout

  </a>
  `;

  menuContainer.innerHTML =
    html;

}
