AOS.init();


let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  let found = false;

  for (let item of cart) {
    if (item.name === name) {
      item.quantity += 1;
      found = true;
      break;
    }
  }

  if (!found) {
    cart.push({ name: name, price: parseFloat(price), quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));


  let badge = document.getElementById("cartCountBadge");
  if (badge) badge.textContent = cart.reduce((sum, i) => sum + i.quantity, 0);


  let toastEl = document.getElementById("liveToast");
  if (toastEl) {
    let toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartList = document.getElementById("cartList");
  let totalElement = document.getElementById("total");
  let itemCount = document.getElementById("itemCount");

  if (!cartList || !totalElement) return;

  cartList.innerHTML = "";
  let total = 0, count = 0;

  for (let item of cart) {
    let subtotal = item.price * item.quantity;
    total += subtotal;
    count += item.quantity;

    let html = `
      <div class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-1">${item.name}</h6>
          <small>Rs ${item.price} × ${item.quantity}</small>
        </div>
        <span class="fw-bold">Rs ${subtotal}</span>
      </div>
    `;
    cartList.innerHTML += html;
  }

  totalElement.textContent = total.toFixed(2);
  if (itemCount) itemCount.textContent = `${count} Items`;
}

function placeOrder() {
  alert("Order placed!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", loadCart);
