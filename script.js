import { products } from "./data/data.js";
let orderArray = [];
const button = document.getElementById("buttonId");
let globalContainer = document.getElementById("globalContainer");

let moduleClick = document.getElementById("moduleClick");
const modal = document.querySelector(".modal");
let overlay = document.querySelector(".overlay");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
moduleClick.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

function fetchProducts() {
  return new Promise((res) => {
    let loding = document.createElement("img");
    loding.setAttribute(
      "src",
      "https://thumbs.gfycat.com/GeneralUnpleasantApisdorsatalaboriosa-size_restricted.gif"
    );
    document.body.appendChild(loding);
    let setTimoueteId = setTimeout(() => {
      res(products);
      if (setTimoueteId) {
        loding.remove();
      }
    }, 2000);
  });
}
const drawProducts = () => {
  fetchProducts()
    .then((res) => JSON.parse(res))
    .then((product) => {
      product.map((item) => {
        creatProduct(item);
      });
    });
};
let conatir = document.createElement("div");
conatir.classList.add("conatir");
const creatProduct = ({ src, name, price }) => {
  let prodctItem = document.createElement("div");
  prodctItem.classList.add("prodctItem");
  let image = document.createElement("img");
  let likeImages = document.createElement("img");
  let order = document.createElement("img");
  order.setAttribute(
    "src",
    "https://e7.pngegg.com/pngimages/865/434/png-clipart-computer-icons-icon-design-shopping-cart-shopping-cart-desktop-wallpaper-basket.png"
  );
  order.classList.add("order");
  likeImages.setAttribute(
    "src",
    "https://cdn-icons-png.flaticon.com/512/14/14815.png"
    // "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/2224px-A_perfect_SVG_heart.svg.png"
  );
  likeImages.classList.add("likeImages");
  let like = false;
  likeImages.onclick = () => {
    if (!like) {
      likeImages.setAttribute(
        "src",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_perfect_SVG_heart.svg/2224px-A_perfect_SVG_heart.svg.png"
      );
      like = true;
    } else {
      likeImages.setAttribute(
        "src",
        "https://cdn-icons-png.flaticon.com/512/14/14815.png"
      );
      like = false;
    }
  };
  image.classList.add("image");
  image.setAttribute("src", `${src}`);
  let title = document.createElement("span");
  title.innerText = name;
  title.classList.add("title");
  let priceName = document.createElement("span");
  priceName.innerText = price;
  order.addEventListener("click", () => {
    orderArray.push({ price, src, name });
    console.log(orderArray);
    let orderName = document.createElement("span");
    orderName.classList.add("orderName");
    let orderPrice = document.createElement("span");
    let orderImg = document.createElement("img");
    let orderDivv = document.createElement("div");
    let deleteElement = document.createElement("button");
    orderDivv.classList.add("orderDivv");
    orderArray.map((item) => {
      orderName.innerText = item.name;
      orderPrice.innerText = item.price;
      deleteElement.innerHTML = "delete";
      orderImg.setAttribute("src", `${item.src}`);
      orderImg.classList.add("orderImg");
      orderDivv.append(orderImg, orderName, orderPrice, deleteElement);
      modal.appendChild(orderDivv);
      modal.scrollIntoView();
    });

    deleteElement.onclick = () => {
      orderDivv.remove();
    };
  });
  prodctItem.appendChild(image);
  prodctItem.appendChild(title);
  prodctItem.appendChild(priceName);
  prodctItem.appendChild(likeImages);
  prodctItem.appendChild(order);
  conatir.appendChild(prodctItem);
  globalContainer.appendChild(conatir);
};
drawProducts();
