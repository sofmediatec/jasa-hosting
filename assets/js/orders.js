async function loadOrders(){

  const result =
    await apiRequest(
      'orders'
    );

  let html = '';

  result.data.forEach(
    order => {

      html += `
      <tr>
        <td>${order.id}</td>
        <td>${order.order_no}</td>
        <td>${order.status}</td>
      </tr>
      `;

    }
  );

  document
  .getElementById(
    'ordersTable'
  )
  .innerHTML = html;

}
