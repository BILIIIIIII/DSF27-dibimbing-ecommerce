var tl = gsap.timeline();

tl.from(".logo", {
  opacity: 0,
  duration: 0.3,
});

tl.from(".menu", {
  opacity: 0,
  duration: 0.3,
});
tl.from(".menu .input-wrapper", {
  opacity: 0,
  duration: 0.8,
  width: "100px",
});
tl.from(".location", {
  opacity: 0,
  duration: 0.3,
});
// ------------------------------------------------------

async function getProducts() {
  try {
    const response = await fetch("./util/products.json");
    const data = await response.json();
    products = data;
    console.log(products);

    addDataToHTML(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

getProducts();

let listProduct = document.getElementById("list-product");

function addDataToHTML(products) {
  products.forEach((data) => {
    let newProduct = document.createElement("a");

    newProduct.href = `/detail.html?id=` + data.id;
    newProduct.classList.add("item");
    newProduct.innerHTML = `
      <div class="hero">
        <img src="${data.image}">
      </div>
      
      <div class="content">
        <h2>${data.name}</h2>
        <div class="price">$${data.price}</div>
      </div>
    `;

    listProduct.appendChild(newProduct);

    var tl = gsap.timeline();

    tl.to(listProduct, {
      transform: "translateY(0px)",
      opacity: 1,
      stagger: 0.5,
      duration: 0.5,
      delay: 0.5,
    });
  });
}
