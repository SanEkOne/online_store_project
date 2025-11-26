class PrintBasketProducts {
  totalPrice = 0;
  constructor(containerId) {
    this.basket_container = document.getElementById(containerId);
  }

  loadItems() {
    const products = JSON.parse(localStorage.getItem("basket_products") || "[]");
    this.basket_container.innerHTML = "";
    this.totalPrice = 0;

    let totalPriceElement = document.getElementById("total_price");

    products.forEach(product => {
      let count = 1;
      let link = document.createElement("a");
      link.href = `../Pages/product_page.html?name=${encodeURIComponent(product.name)}`;
      link.className = "product_link";

      this.totalPrice += Number(product.price);

      let mainPhoto = product.photo1;

      let div = document.createElement("div");
      div.className = "product_icon";
      div.innerHTML = `
        <img src="${mainPhoto}" class="product_image">
        <p>${product.name}</p>
        <p>${product.price} ₴</p>
        `;

      let amount_div = document.createElement("div");
      let totalProductPrice = Number(product.price);
      amount_div.className = "product_amount";
      amount_div.innerHTML = `
        <button class="addBTN">+</button>
        <p class="count">${count}</p>
        <button class="removeBTN">-</button>
        <h1 class="productPrice">Цена: ${totalProductPrice}</h1>`;

      let container = document.createElement("div");
      container.className = "product_price_amount_container";



      let addBtn = amount_div.querySelector(".addBTN");
      let removeBtn = amount_div.querySelector(".removeBTN");
      let countEl = amount_div.querySelector(".count");
      let priceEl = amount_div.querySelector(".productPrice");


      addBtn.addEventListener("click", () => {
        count++;
        countEl.textContent = count;
        totalProductPrice += Number(product.price);
        priceEl.textContent = `Цена: ${totalProductPrice} ₴`;

        this.totalPrice += Number(product.price);
        totalPriceElement.textContent = "Итоговая цена: " + this.totalPrice + " ₴";
      });

      removeBtn.addEventListener("click", () => {
        if (count > 1) {
          count--;
          countEl.textContent = count;
          totalProductPrice -= Number(product.price);
          priceEl.textContent = `Цена: ${totalProductPrice} ₴`;

          this.totalPrice -= Number(product.price);
          totalPriceElement.textContent = "Итоговая цена: " + this.totalPrice + " ₴";
        }
      });



      link.appendChild(div);
      container.appendChild(link);
      container.appendChild(amount_div);

      this.basket_container.appendChild(container);

    })
    document.getElementById("total_price").textContent = `Итоговая цена: ${this.totalPrice} ₴`;
  }

}

const printProducts = new PrintBasketProducts("product");
printProducts.loadItems();




class OrderForm {
  constructor(){
    this.ukrPoshtaRadio = document.getElementById("ukrposhta");
    this.novaPoshtaRadio = document.getElementById("novaposhta");
    this.pickupRadio = document.getElementById("pickup");

    this.ukrPoshtaDeliveryContainer = document.getElementById("ukrposhta_delivery_container");
    this.novaPoshtaDeliveryContainer = document.getElementById("novaposhta_delivery_container");
    this.pickupDeliveryContainer = document.getElementById("pickup_delivery_container");

    this.hideAll();

    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
      radio.addEventListener('change', () => this.chooseDeliveryMethod());
    });
  }

  hideAll() {
    const containers = [
      this.ukrPoshtaDeliveryContainer,
      this.novaPoshtaDeliveryContainer,
      this.pickupDeliveryContainer
    ];
    containers.forEach(container => {
      if (container) container.style.display = "none";
    });
  }

  chooseDeliveryMethod(){
    this.hideAll();

    if (this.ukrPoshtaRadio?.checked) {
      this.ukrPoshtaDeliveryContainer.style.display = "flex";
    } else if (this.novaPoshtaRadio?.checked) {
      this.novaPoshtaDeliveryContainer.style.display = "flex";
    } else if (this.pickupRadio?.checked) {
      this.pickupDeliveryContainer.style.display = "flex";
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const orderForm = new OrderForm();
});


