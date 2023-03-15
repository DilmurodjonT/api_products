const $container = document.querySelector(".container");
const $loader = document.querySelector(".loader");

function renderData() {
  checkLoader(true);
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      $container.innerHTML = "";
      data.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
                  <div class="product-card__image-wrapper"><img src="${product.images[0]}" alt="${product.description}"></div>
                  <h2>${product.title}</h2>
                  <strong>$${product.price}</strong>
                  <p>${product.description}</p>
                  <button data-product-id="${product.id}" class="delete-btn">Delete product</button>
                  `;
        $container.appendChild(productCard);
        checkLoader(false);
      });
      // console.log(data);
    });
}

renderData();

function checkLoader(isLoading) {
  if (isLoading) {
    $loader.style.display = "flex";
  } else {
    $loader.style.display = "none";
  }
}

$container.addEventListener("click", (e) => {
  if (e.target.className == "delete-btn") {
    checkLoader(true);
    // console.log(e.target.getAttribute("data-product-id")); // 1 holat getAttribute
    console.log(e.target.dataset.productId); // 2 holat dataset
    fetch(
      `https://api.escuelajs.co/api/v1/products/${e.target.dataset.productId}`,
      { method: "DELETE" }
    )
      .then((response) => response.json())
      //   .then((data) => console.log(data))
      .then((data) => {
        if (data) {
          //   window.location.reload(); // eski usul polni sayt ref resh bo'ladi
          renderData(); // bu esa hamma saytni ref resh qilmay o'shani o'zini qiladi
        }
      });
  }
});
