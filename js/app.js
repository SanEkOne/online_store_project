class PrintProducts {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  loadItems(minPrice, maxPrice) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    this.container.innerHTML = "";

    products.forEach(product => {
      let link = document.createElement("a");
      link.href = `Pages/product_page.html?name=${encodeURIComponent(product.name)}`;
      link.className = "product_link";

      minPrice = Number(minPrice) || 1;
      maxPrice = Number(maxPrice) || 1000;

      let mainPhoto = product.photo1;

      let div = document.createElement("div");
      div.className = "product_icon";
      div.innerHTML = `
        <img src="${mainPhoto}" class="product_image">
        <p>${product.name}</p>
        <p>${product.price} ₴</p>
        `;

      if (product.price >= minPrice && product.price <= maxPrice) {
        link.appendChild(div);
        this.container.appendChild(link);
      }

      // link.appendChild(div);
      // this.container.appendChild(link);
    })
  }
}

class Filter {
  constructor() {
    this.price_range = document.getElementById("price_range");
    this.min_price = document.getElementById("min_price_input");
    this.max_price = document.getElementById("max_price_input");
    this.submitBTN = document.getElementById("submitBTN");

    this.submitBTN.addEventListener("click", () => this.startFilter());
    printProducts.loadItems(this.min_price.value, this.max_price.value);
    this.price_range.addEventListener("input", () => this.displayInputPrice());
    this.min_price.addEventListener("input", () => this.validatePrices());
    this.max_price.addEventListener("input", () => this.validatePrices());
    this.displayInputPrice()

  }

  startFilter(){
    printProducts.loadItems(this.min_price.value, this.max_price.value);

  }

  displayInputPrice() {
    this.max_price.value = this.price_range.value;
    this.price_range.min = this.min_price.value;
  }

  validatePrices() {
    this.min_price.value = this.min_price.value.replace(/\D/g, "");
    this.max_price.value = this.max_price.value.replace(/\D/g, "");

    let min = Number(this.min_price.value);
    let max = Number(this.max_price.value);

    if (min < 1) min = 1;
    if (max > 1000) max = 1000;

    if (min > max) {
      min = 1;
      max = 1000;
    }

    this.min_price.value = min;
    this.max_price.value = max;

    this.price_range.min = min;
    this.price_range.max = max;
  }
}

const printProducts = new PrintProducts("products_container");
const filter = new Filter();

// localStorage.removeItem("products");
// localStorage.removeItem("basket_products");

