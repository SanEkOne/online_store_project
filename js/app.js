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
    this.categorycomputers_and_laptops_link = document.getElementById("computers_and_laptops_link");
    this.category_sport_link = document.getElementById("sport_link");
    this.category_plumbing_link = document.getElementById("plumbing_link");
    this.category_products_for_home_link = document.getElementById("products_for_home_link");
    this.category_clothes = document.getElementById("clothes_link");
    this.category_beauty_and_health = document.getElementById("beauty_and_health_link");
    this.category_furniture_and_accessories = document.getElementById("furniture_and_accessories_link");
    this.category_toys_and_games = document.getElementById("toys_and_games_link");
    this.category_automotive = document.getElementById("automotive_link");
    this.category_garden = document.getElementById("garden_link");
    this.category_tools = document.getElementById("tools_link");
    this.category_pet_supplies = document.getElementById("pet_supplies_link");
    this.category_books_and_office = document.getElementById("books_and_office_link");


    this.submitBTN.addEventListener("click", () => this.startFilter());
    printProducts.loadItems(this.min_price.value, this.max_price.value);
    this.price_range.addEventListener("input", () => this.displayInputPrice());
    this.min_price.addEventListener("input", () => this.validatePrices());
    this.max_price.addEventListener("input", () => this.validatePrices());
    this.displayInputPrice()

    this.categorycomputers_and_laptops_link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.categorycomputers_and_laptops_link.textContent)}`;
    });
    this.category_sport_link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_sport_link.textContent)}`;
    });
    this.category_plumbing_link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_plumbing_link.textContent)}`;
    });
    this.category_products_for_home_link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_products_for_home_link.textContent)}`;
    });
    this.category_clothes.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_clothes.textContent)}`;
    });

    this.category_beauty_and_health.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_beauty_and_health.textContent)}`;
    });

    this.category_furniture_and_accessories.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_furniture_and_accessories.textContent)}`;
    });

    this.category_toys_and_games.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_toys_and_games.textContent)}`;
    });

    this.category_automotive.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_automotive.textContent)}`;
    });

    this.category_garden.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_garden.textContent)}`;
    });

    this.category_tools.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_tools.textContent)}`;
    });

    this.category_pet_supplies.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_pet_supplies.textContent)}`;
    });

    this.category_books_and_office.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = `Pages/category_page.html?category=${encodeURIComponent(this.category_books_and_office.textContent)}`;
    });


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

