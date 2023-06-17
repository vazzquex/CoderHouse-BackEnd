const socket = io();

socket.on('updateProducts', (data) => {
  const tbody = document.getElementById("updatePrNow");

  const productsMap = data
    .map((item) => {
      return `<tr>
      <th scope="row">${item.id}</th>
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td>${item.code}</td>
      <td>${item.stock}</td>
      <td>${item.category}</td>
      <td>${item.status}</td>
      </tr>`;
    })
    .join("");
  tbody.innerHTML = productsMap;
});

const deleteForm = document.getElementById("deleteForm");

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const id = parseInt(deleteForm.elements.id.value);

  socket.emit('deleteProduct', id);
});
    
const addProductsFrom = document.getElementById('addProductsFrom')

addProductsFrom.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = addProductsFrom.elements.title.value;
  const description = addProductsFrom.elements.description.value;
  const price = addProductsFrom.elements.price.value;
  const code = addProductsFrom.elements.code.value;
  const stock = addProductsFrom.elements.stock.value;
  const category = addProductsFrom.elements.category.value;

  socket.emit('newProduct', {
    title,
    description,
    price,
    code,
    stock,
    category
  });
});
