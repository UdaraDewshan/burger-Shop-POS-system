if (typeof AOS !== 'undefined' && AOS && typeof AOS.init === 'function') {
  AOS.init();
}

const items = [
  { id: 1, name: "Classic Burger", price: 1200, img: "asset/image/burger 1.jpg" },
  { id: 2, name: "Cheese Burger", price: 1300, img: "asset/image/burger2.jpg" },
  { id: 3, name: "Shawarma Burger", price: 1450, img: "asset/image/burger3.jpg" },
  { id: 4, name: "Pimento Cheeseburger", price: 650, img: "asset/image/burger4.jpg" },
  { id: 5, name: "Slaw Burger", price: 400, img: "asset/image/burger5.jpeg" },
  { id: 6, name: "Green Chile Cheeseburger", price: 500, img: "asset/image/burger 6.jpg" },
  { id: 7, name: "Specialty Burger", price: 500, img: "asset/image/burger7.jpg" },
  { id: 8, name: "Turkey Burger", price: 800, img: "asset/image/berger8.jpg" },
  { id: 9, name: "Hamburger", price: 2000, img: "asset/image/burger9.jpeg" },
  { id: 10, name: "Veggie Burger", price: 1200, img: "asset/image/burger10.jpg" },
  { id: 11, name: "Chicken Burger", price: 700, img: "asset/image/burger11.jpeg" },
  { id: 12, name: "Lamb Burger", price: 900, img: "asset/image/burger12.jpeg" }
];

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id) {
  const cart = getCart();
  const product = items.find(p => p.id === id);
  if (!product) return console.warn("Product not found:", id);

  const found = cart.find(c => c.id === id);
  if (found) found.quantity = (found.quantity || 1) + 1;
  else cart.push({ ...product, quantity: 1 });

  saveCart(cart);
  alert(`${product.name} added to cart`);
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((s, item) => s + (item.quantity || 0), 0);
  const badge = document.getElementById("cartCountBadge");
  if (badge) badge.textContent = count;
}


function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if (!container) return;

  const cart = getCart();
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
    if (totalEl) totalEl.textContent = "0";
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += (item.price || 0) * (item.quantity || 1);

    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="row g-0 align-items-center">
        <div class="col-3">
          <img src="${item.img}" class="img-fluid rounded-start" alt="${item.name}">
        </div>
        <div class="col-9">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h5 class="card-title mb-1">${item.name}</h5>
              <p class="card-text mb-0">RS ${item.price} × ${item.quantity}</p>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQty(${item.id})">−</button>
              <button class="btn btn-outline-secondary btn-sm" onclick="increaseQty(${item.id})">+</button>
              <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  if (totalEl) totalEl.textContent = total;
}


function increaseQty(id) {
  const cart = getCart();
  const it = cart.find(i => i.id === id);
  if (!it) return;
  it.quantity = (it.quantity || 1) + 1;
  saveCart(cart);
  renderCart();
}

function decreaseQty(id) {
  const cart = getCart();
  const it = cart.find(i => i.id === id);
  if (!it) return;
  it.quantity = Math.max(1, (it.quantity || 1) - 1);
  saveCart(cart);
  renderCart();
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  renderCart();
}

function placeOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Order placed successfully!");
  localStorage.removeItem("cart");
  updateCartCount();
  window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});
