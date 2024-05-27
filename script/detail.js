async function getProducts() {
  try {
    const response = await fetch("./util/products.json");
    const data = await response.json();
    products = data;
    console.log(products);

    showdetail(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

getProducts();

function showdetail(products) {
  let detailProduct = document.getElementById("detail-product");

  let productID = new URLSearchParams(window.location.search).get("id");
  let thisProduct = products.filter((value) => {
    return value.id == productID;
  })[0];

  if (!thisProduct) {
    window.location.href = "/";
  }

  detailProduct.querySelector(".hero img").src = thisProduct.image;
  detailProduct.querySelector(".name").innerText = thisProduct.name;
  detailProduct.querySelector(".price").innerText = `$` + thisProduct.price;
  detailProduct.querySelector(".desc").innerText = thisProduct.description;

  let similarProduct = document.getElementById("list-similar-product");

  products
    .filter((value) => value.id != productID)
    .forEach((data) => {
      let newProduct = document.createElement("a");

      newProduct.href = `/detail.html?id=` + data.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `
      <div class="hero">
        <img src="${data.image}">
      </div>
      
      <div class="content">
        <h2>${data.name}</h2>
        <div class="price">${data.price}</div>
      </div>
    `;

      var tl = gsap.timeline();

      tl.to(".item", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        delay: 0.3,
      });

      similarProduct.appendChild(newProduct);

      var tl = gsap.timeline();

      tl.to(similarProduct, {
        transform: "translateY(0px)",
        opacity: 1,
        stagger: 0.5,
        duration: 0.5,
        delay: 0.5,
      });
    });
}

const buttonBack = document.querySelector(".btn-back");
console.log(buttonBack);

buttonBack.addEventListener("click", () => {
  window.location.href = "/";
});
