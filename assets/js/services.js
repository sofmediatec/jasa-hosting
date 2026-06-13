/**
 * ==========================================
 * Services Module
 * ==========================================
 */

let serviceData = [];

async function loadServices(){

  const result =
    await apiRequest(
      'services',
      {},
      'GET'
    );

  if(!result.success){

    alert(
      result.message
    );

    return;
  }

  serviceData =
    result.data || [];

  renderServices();

}

function renderServices(){

  const tbody =
    document.getElementById(
      'serviceTable'
    );

  let html='';

  serviceData.forEach(item=>{

    html +=
    `
    <tr class="border-b">

      <td class="p-3">
        ${item.id}
      </td>

      <td class="p-3">
        ${item.name}
      </td>

      <td class="p-3">
        ${item.slug}
      </td>

      <td class="p-3">
        Rp ${Number(item.base_price).toLocaleString()}
      </td>

      <td class="p-3">
        Rp ${Number(item.admin_price).toLocaleString()}
      </td>

      <td class="p-3">
        ${item.status}
      </td>

      <td class="p-3">

        <button
          onclick="editService(${item.id})"
          class="bg-yellow-500 text-white px-2 py-1 rounded">

          Edit

        </button>

      </td>

    </tr>
    `;
  });

  if(serviceData.length===0){

    html =
    `
    <tr>
      <td colspan="7" class="p-5 text-center">
        Tidak ada data
      </td>
    </tr>
    `;
  }

  tbody.innerHTML =
    html;

}

function openCreateModal(){

  document
  .getElementById(
    'serviceId'
  )
  .value='';

  document
  .getElementById(
    'modalTitle'
  )
  .innerText=
  'Tambah Service';

  document
  .getElementById(
    'serviceModal'
  )
  .classList
  .remove('hidden');

}

function closeModal(){

  document
  .getElementById(
    'serviceModal'
  )
  .classList
  .add('hidden');

}

function editService(id){

  const item =
    serviceData.find(
      x=>Number(x.id)===Number(id)
    );

  if(!item){
    return;
  }

  document.getElementById('serviceId').value=item.id;
  document.getElementById('name').value=item.name;
  document.getElementById('slug').value=item.slug;
  document.getElementById('description').value=item.description;
  document.getElementById('basePrice').value=item.base_price;
  document.getElementById('adminPrice').value=item.admin_price;
  document.getElementById('status').value=item.status;

  document
  .getElementById(
    'modalTitle'
  )
  .innerText=
  'Edit Service';

  document
  .getElementById(
    'serviceModal'
  )
  .classList
  .remove('hidden');

}

async function saveService(){

  const id =
    document.getElementById(
      'serviceId'
    ).value;

  const payload = {

    id:id,

    name:
      document.getElementById('name').value,

    slug:
      document.getElementById('slug').value,

    description:
      document.getElementById('description').value,

    base_price:
      document.getElementById('basePrice').value,

    admin_price:
      document.getElementById('adminPrice').value,

    status:
      document.getElementById('status').value

  };

  let action =
    'create_service';

  if(id){

    action =
      'update_service';

  }

  const result =
    await apiRequest(
      action,
      payload
    );

  if(!result.success){

    alert(
      result.message
    );

    return;
  }

  alert(
    'Data berhasil disimpan'
  );

  closeModal();

  loadServices();

}
