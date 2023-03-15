const $createForm = document.querySelector("#create");
const $productTitleInp = document.querySelector("#title");
const $productPriceInp = document.querySelector("#price");
const $productDescInp = document.querySelector("#description");
const $productCategoryInp = document.querySelector("#category");
const $productImageInp = document.querySelector("#image");

$createForm.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://api.escuelajs.co/api/v1/products/", {
    method: "POST",
    body: {
      title: $productTitleInp.value,
      price: $productPriceInp.value,
      description: $productDescInp.value,
      categoryId: $productCategoryInp.value,
      images: [$productImageInp.value],
    },
  });
});
