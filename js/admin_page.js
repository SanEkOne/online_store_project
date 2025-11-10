class ProductForm {
  constructor(nameId, descriptionId,availabilityId, priceId, categoryId, buttonId, photoInputId1, photoId1, photoInputId2, photoId2, photoInputId3, photoId3, photoInputId4, photoId4) {
    this.productName = document.getElementById(nameId);
    this.productDescription = document.getElementById(descriptionId);
    this.productAvailability = document.getElementById(availabilityId);
    this.productPrice = document.getElementById(priceId);
    this.productCategory = document.getElementById(categoryId);
    this.addProductButton = document.getElementById(buttonId);
    this.photoInput1 = document.getElementById(photoInputId1);
    this.photo1 = document.getElementById(photoId1);
    this.photoInput2 = document.getElementById(photoInputId2);
    this.photo2 = document.getElementById(photoId2);
    this.photoInput3 = document.getElementById(photoInputId3);
    this.photo3 = document.getElementById(photoId3);
    this.photoInput4 = document.getElementById(photoInputId4);
    this.photo4 = document.getElementById(photoId4);

    this.addProductButton.addEventListener('click', () => this.createProduct());
    this.photoInput1.addEventListener('change', () => this.addPhoto(this.photoInput1, this.photo1));

    this.photoInput2.addEventListener('change', () => this.addPhoto(this.photoInput2, this.photo2));

    this.photoInput3.addEventListener('change', () => this.addPhoto(this.photoInput3, this.photo3));

    this.photoInput4.addEventListener('change', () => this.addPhoto(this.photoInput4, this.photo4));
  }
  addPhoto(photoInput, photo){
    const file = photoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        photo.src = reader.result;
        photo.dataset.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
      availability: this.productAvailability.value,
      price: this.productPrice.value,
      category: this.productCategory.value,
      photo1: this.photo1.dataset.image || "",
      photo2: this.photo2.dataset.image || "",
      photo3: this.photo3.dataset.image || "",
      photo4: this.photo4.dataset.image || ""
    };

    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.category) {
      alert("Введите название, описание, категорию и цену товара!");
      return;
    }

    this.saveItem(newProduct);

    this.productName.value = "";
    this.productDescription.value = "";
    this.productAvailability.value = "";
    this.productPrice.value = "";
    this.productCategory.value = "";

    [this.photo1, this.photo2, this.photo3, this.photo4].forEach(photo => {
      photo.src = "";
      delete photo.dataset.image;
    });

    alert("Товар успешно добавлен!");
  }
}


// создаем экземпляр класса
const addProdForm = new ProductForm(
  "product_name_input",
  "product_description_input",
  "product_availability_input",
  "product_price_input",
  "product_category_input",
  "submitBTN",
  "product_photo1_input",
  "product_photo1",
  "product_photo2_input",
  "product_photo2",
  "product_photo3_input",
  "product_photo3",
  "product_photo4_input",
  "product_photo4"
);






