const params = new URLSearchParams(window.location.search);
const productName = decodeURIComponent(params.get("name"));

const products = JSON.parse(localStorage.getItem("products") || "[]");
const product = products.find(p => p.name === productName);

if (product) {
  document.getElementById("product_name").textContent = product.name;
  document.getElementById("product_description").textContent = product.description;
  document.getElementById("product_price").textContent = `${product.price} ₴`;
  document.getElementById("product_category").textContent = product.category;
}
else {
  document.body.innerHTML = "<h1>Товар не найден</h1>";
}
