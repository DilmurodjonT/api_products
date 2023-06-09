const $container = document.querySelector(".container");
const $loader = document.querySelector(".loader");
const $updateMain = document.querySelector("#update-main");
const $updateForm = document.querySelector("#update");
const $productTitleInp = document.querySelector("#title");
const $productPriceInp = document.querySelector("#price");
const $productDescInp = document.querySelector("#description");
const $productCategoryInp = document.querySelector("#category");
const $productImageInp = document.querySelector("#image");

//-------- 30tadan ko'p harfni kesadi...
function truncateWords(str) {
  if (str.split("").length > 30) {
    return str.split("").slice(0, 30).join("") + "...";
  }
  return str;
}

//----------- Asosiy funtion
function renderData() {
  checkLoader(true);
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((response) => response.json())
    .then((data) => {
      $container.innerHTML = "";
      data.reverse().forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
                  <div class="product-card__image-wrapper"><img src="${
                    product.images[0]
                  }" alt="${product.description}"></div>
                  <h2>${truncateWords(product.title)}</h2>
                  <strong>$${product.price}</strong>
                  <div class="desc">${truncateWords(product.description)} <p>${
          product.description
        }</p></div>
                  <button data-product-id="${
                    product.id
                  }" class="delete-btn">Delete product</button>
                  <button data-product-id="${
                    product.id
                  }" class="edit-btn">Edit product</button>
                  `;
        $container.appendChild(productCard);
        checkLoader(false);
      });
      // console.log(data);
    });
}

renderData();

//---------- aylanadigan mushuk chiqishi
function checkLoader(isLoading) {
  if (isLoading) {
    $loader.style.display = "flex";
  } else {
    $loader.style.display = "none";
  }
}

//---------O'chirish function
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
  } else if (e.target.className == "edit-btn") {
    // console.log("edit bosildi");
    // console.log(e.target.dataset.productId);
    $updateMain.style.display = "block";
    $updateForm.setAttribute("edit-id", e.target.dataset.productId);
  }
});

//------------Tahrirlash function
$updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(
    `https://api.escuelajs.co/api/v1/products/${e.target.getAttribute(
      "edit-id"
    )}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: $productTitleInp.value,
        price: $productPriceInp.value,
        description: $productDescInp.value,
        categoryId: $productCategoryInp.value,
        images: [$productImageInp.value],
      }),
    }
  )
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .then((data) => {
      if (data.id) {
        $updateMain.style.display = "none";
        $updateForm.removeAttribute("edit-id");
        renderData();
      }
    });
});
