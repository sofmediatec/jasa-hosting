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

  if(!result || !result.success){

    alert(
      result?.message ||
      'Gagal memuat data'
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

  let html = '';

  serviceData.forEach(item=>{

    html += `
    <tr class="border-b">

      <td class="p-3">${item.id}</td>

      <td class="p-3">${item.code}</td>

      <td class="p-3">${item.name}</td>

      <td class="p-3">${item.category}</td>

      <td class="p-3">
        Rp ${Number(item.setup_fee || 0).toLocaleString()}
      </td>

      <td class="p-3">
        Rp ${Number(item.monthly_price || 0).toLocaleString()}
      </td>

      <td class="p-3">
        Rp ${Number(item.yearly_price || 0).toLocaleString()}
      </td>

      <td class="p-3">
        ${item.status}
      </td>

      <td class="p-3 flex gap-2">

        <button
          onclick="editService(${item.id})"
          class="bg-yellow-500 text-white px-2 py-1 rounded">

          Edit

        </button>

        <button
          onclick="deleteServiceConfirm(${item.id})"
          class="bg-red-600 text-white px-2 py-1 rounded">

          Hapus

        </button>

      </td>

    </tr>
    `;

  });

  if(serviceData.length===0){

    html = `
    <tr>
      <td colspan="9" class="text-center p-5">
        Tidak ada data
      </td>
    </tr>
    `;
  }

  tbody.innerHTML = html;

}

function openCreateModal(){

  document.getElementById('serviceId').value='';
  document.getElementById('code').value='';
  document.getElementById('name').value='';
  document.getElementById('category').value='';
  document.getElementById('description').value='';
  document.getElementById('setupFee').value='';
  document.getElementById('monthlyPrice').value='';
  document.getElementById('yearlyPrice').value='';
  document.getElementById('status').value='active';

  document.getElementById(
    'modalTitle'
  ).innerText =
  'Tambah Service';

  document.getElementById(
    'serviceModal'
  ).classList.remove(
    'hidden'
  );

}

function closeModal(){

  document.getElementById(
    'serviceModal'
  ).classList.add(
    'hidden'
  );

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
  document.getElementById('code').value=item.code;
  document.getElementById('name').value=item.name;
  document.getElementById('category').value=item.category;
  document.getElementById('description').value=item.description;
  document.getElementById('setupFee').value=item.setup_fee;
  document.getElementById('monthlyPrice').value=item.monthly_price;
  document.getElementById('yearlyPrice').value=item.yearly_price;
  document.getElementById('status').value=item.status;

  document.getElementById(
    'modalTitle'
  ).innerText =
  'Edit Service';

  document.getElementById(
    'serviceModal'
  ).classList.remove(
    'hidden'
  );

}

async function saveService(){

  const id =
    document.getElementById(
      'serviceId'
    ).value;

  const payload = {

    id:id,

    code:
      document.getElementById('code').value,

    name:
      document.getElementById('name').value,

    category:
      document.getElementById('category').value,

    description:
      document.getElementById('description').value,

    setup_fee:
      Number(
        document.getElementById('setupFee').value
      ),

    monthly_price:
      Number(
        document.getElementById('monthlyPrice').value
      ),

    yearly_price:
      Number(
        document.getElementById('yearlyPrice').value
      ),

    status:
      document.getElementById('status').value

  };

  const action =
    id
    ? 'update_service'
    : 'create_service';

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
    'Service berhasil disimpan'
  );

  closeModal();

  loadServices();

}

async function deleteServiceConfirm(id){

  if(
    !confirm(
      'Yakin ingin menghapus service ini?'
    )
  ){
    return;
  }

  const result =
    await apiRequest(
      'delete_service',
      {
        id:id
      }
    );

  if(!result.success){

    alert(
      result.message
    );

    return;
  }

  alert(
    'Service berhasil dihapus'
  );

  loadServices();

}
