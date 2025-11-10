class PrintProducts{
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  loadItems() {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    this.container.innerHTML = "";

    products.forEach(product => {
      let link = document.createElement("a");
      link.href = `Pages/product_page.html?name=${encodeURIComponent(product.name)}`;
      link.className = "product_link";

      let div = document.createElement("div");
      div.className = "product_icon";
      div.innerHTML = `
        ${product.name}
        ${product.price} ₴
        `;

      link.appendChild(div);
      this.container.appendChild(link);

    })
  }
}

const printProducts = new PrintProducts("products_container");
printProducts.loadItems();


