const params = new URLSearchParams(window.location.search);
const category = params.get("category");

console.log("Категория:", category);

const products = JSON.parse(localStorage.getItem("products")) || [];
const filtered = products.filter(p => p.category === category);

const container = document.getElementById("products");


if (filtered.length === 0) {
  container.innerHTML = "<p>Нет товаров в этой категории</p>";
}

filtered.forEach(p => {
  container.innerHTML += `
    <div class="product">
    <img src="${p.photo1}"/>
      <h3>${p.name}</h3>
      <p>Цена: ${p.price}$</p>
    </div>
  `;
});

