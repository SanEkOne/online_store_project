class ProductForm {
  constructor(nameId, descriptionId, priceId, categoryId, buttonId) {
    this.productName = document.getElementById(nameId);
    this.productDescription = document.getElementById(descriptionId);
    this.productPrice = document.getElementById(priceId);
    this.productCategory = document.getElementById(categoryId);
    this.addProductButton = document.getElementById(buttonId);

    this.addProductButton.addEventListener('click', () => this.createProduct());
  }

  saveItem(product) {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
  }

  createProduct() {
    const newProduct = {
      name: this.productName.value,
      description: this.productDescription.value,
      price: this.productPrice.value,
      category: this.productCategory.value
    };

    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category) {
      alert("Введите название и цену товара!");
      return;
    }

    this.saveItem(newProduct);

    this.productName.value = "";
    this.productDescription.value = "";
    this.productPrice.value = "";
    this.productCategory.value = "";

    alert("Товар успешно добавлен!");
  }
}

// создаем экземпляр класса
const obj = new ProductForm(
  "product_name_input",
  "product_description_input",
  "product_price_input",
  "product_category_input",
  "submitBTN"
);








