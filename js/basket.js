class PrintBasketProducts{
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  loadItems() {
    const products = JSON.parse(localStorage.getItem("basket_products") || "[]");
    this.container.innerHTML = "";

    products.forEach(product => {
      let link = document.createElement("a");
      link.href = `../Pages/product_page.html?name=${encodeURIComponent(product.name)}`;
      link.className = "product_link";

      let mainPhoto = product.photo1;

      let div = document.createElement("div");
      div.className = "product_icon";
      div.innerHTML = `
        <img src="${mainPhoto}" class="product_image">
        <p>${product.name}</p>
        <p>${product.price} ₴</p>
        `;

      link.appendChild(div);
      this.container.appendChild(link);

    })
  }
}

const printProducts = new PrintBasketProducts("basket_container");
printProducts.loadItems();
