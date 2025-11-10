class Product {
  constructor() {
    this.product_photo1 = document.getElementById("product_photo1");
    this.product_photo2 = document.getElementById("product_photo2");
    this.product_photo3 = document.getElementById("product_photo3");
    this.product_photo4 = document.getElementById("product_photo4");
    this.product_name = document.getElementById("product_name");
    this.product_description = document.getElementById("product_description");
    this.product_availability = document.getElementById("product_availability");
    this.product_price = document.getElementById("product_price");
    this.product_category = document.getElementById("product_category");
  }

  printProductInfo() {
    const params = new URLSearchParams(window.location.search);
    const productName = decodeURIComponent(params.get("name"));

    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const product = products.find(p => p.name === productName);

    if (product) {
      this.product_photo1.src = product.photo1;
      this.product_photo2.src = product.photo2;
      this.product_photo3.src = product.photo3;
      this.product_photo4.src = product.photo4;
      this.product_name.textContent = product.name;
      this.product_description.textContent = product.description;
      this.product_availability.textContent = product.availability;
      this.product_price.textContent = `${product.price} ₴`;
      this.product_category.textContent = product.category;
    }
    else {
      document.body.innerHTML = "<h1>Товар не найден</h1>";
    }
  }
}

class AddToBasket {
  constructor() {
    this.button = document.getElementById("buyBTN");
    this.product_photo1 = document.getElementById("product_photo1");
    this.product_photo2 = document.getElementById("product_photo2");
    this.product_photo3 = document.getElementById("product_photo3");
    this.product_photo4 = document.getElementById("product_photo4");
    this.product_name = document.getElementById("product_name");
    this.product_description = document.getElementById("product_description");
    this.product_availability = document.getElementById("product_availability");
    this.product_price = document.getElementById("product_price");
    this.product_category = document.getElementById("product_category");

    this.button.addEventListener("click", () => this.createBasketItem());
  }
  createBasketItem() {
    const newProduct = {
      name: this.product_name.textContent,
      description: this.product_description.textContent,
      availability: this.product_availability.textContent,
      price: this.product_price.textContent.replace(" ₴", ""),
      category: this.product_category.textContent,
      photo1: this.product_photo1.src || "",
      photo2: this.product_photo2.src || "",
      photo3: this.product_photo3.src || "",
      photo4: this.product_photo4.src || ""
    };

    this.addToBasket(newProduct);
  }

  addToBasket(product) {
    const products = JSON.parse(localStorage.getItem("basket_products") || "[]");

    const exists = products.some(p => p.name === product.name);

    if (exists) {
      alert("Этот товар уже есть в корзине!");
      return;
    }

    products.push(product);
    localStorage.setItem("basket_products", JSON.stringify(products));

    alert("Товар добавлен в корзину!");
  }
}


const product = new Product();
product.printProductInfo();

const basket = new AddToBasket();
