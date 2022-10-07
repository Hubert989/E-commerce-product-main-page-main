const cart_icon = document.querySelector(".cart__icon");
const cart = document.querySelector(".cart__container");
const empty = document.querySelector(".empty");
const add__to__cart = document.querySelector(".add__to__cart");
const cartList = document.querySelector('.cart-list');
const plus = document.querySelector(".increase");
const minus = document.querySelector(".decrease");
let value_count = document.querySelector(".value");
let icon_count = document.querySelector(".cart__icon__count");
let count = 0;
let cartItemID = 1;
const images = document.querySelectorAll(".thumbnail__img");
const modal_images = document.querySelectorAll(".thumb__img");
const big_img = document.querySelector(".sneaker__product");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const modal__product__img = document.querySelector(".modal__product__img");
const slider__thumbnail = document.querySelector(".slider__thumbnail");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const THUMBNAILS = document.querySelectorAll(".thumbnail img");
let currentImgIndex = 0;
const ham = document.querySelector(".mobile__menu");
const nav__collections = document.querySelector(".nav__collections");

ham.addEventListener("click", ()=>{
  ham.classList.toggle("visible");
  nav__collections.classList.toggle("on");
})

images.forEach((thumbImg) => {
  thumbImg.addEventListener("click", () => {
    let file = thumbImg.src;
    let cut_file = file.replace("-thumbnail", "");
    big_img.src = cut_file;
    mark();
    thumbImg.parentNode.classList.add("active");
  })
})

modal_images.forEach((thumbImg) => {
  thumbImg.addEventListener("click", () => {
    let file = thumbImg.src;
    let cut_file = file.replace("-thumbnail", "");
    modal__product__img.src = cut_file;
    mark2();
    thumbImg.parentNode.classList.add("choice");
  })
})

function mark() {
  var childImages = document.querySelector(".thumbnails").children;
  var i;

  for (i = 0; i < childImages.length; i++) {
    childImages[i].classList.remove("active");
  }
}

function mark2() {
  var childImages = document.querySelector(".slides__container").children;
  var i;

  for (i = 0; i < childImages.length; i++) {
    childImages[i].classList.remove("choice");
  }
}

big_img.addEventListener("click", () => {
  mark2();
  modal__product__img.src = big_img.src;

  let str = big_img.src;
  str = str.replace(".jpg", "");
  str = str.concat("-thumbnail.jpg");
  console.log(str);
  
  modal_images.forEach((thumbImg) => {
    if(thumbImg.src == str)
    {
      thumbImg.parentNode.classList.add("choice");
    }
  })
  
  modal.classList.add("show");

})

close.addEventListener("click", () => {
  modal.classList.remove("show");
})

cartList.addEventListener('click', deleteProduct);

function deleteProduct(e) {
  let cartItem;
  if (e.target.tagName === "IMG") {
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove();
  }
  icon_count.textContent--;
  if (icon_count.textContent == "0") {
    empty.style.display = "block";
    icon_count.style.display = "none";
    cartItemID = 1;
  }
}

function addToCartList() {
  empty.style.display = "none";
  let productInfo = {
    imgSrc: document.querySelector('.one').src,
    name: document.querySelector('.fall_limited').textContent,
    price_single: document.querySelector('.sneaker__price').textContent,
    count_product: document.querySelector('.value').textContent,
    price: document.querySelector('.sneaker__cancel').textContent
  }

  let result = (parseFloat(productInfo.price_single) * parseFloat(productInfo.count_product)).toFixed(2);

  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');
  cartItem.innerHTML = `
  <img class="cart__img" src="${productInfo.imgSrc}" alt="product image">
            <div class="cart-item-info">
              <h3 class="cart-item-name">${productInfo.name}</h3>
              <div>
                <span class="cart-item-price">${productInfo.price_single}</span>
                <span>x</span>
                <span class="cart-item-count">${productInfo.count_product}</span>
                <span class="cart-item-result">${"$" + result}</span>
              </div>
            </div>
            <button type = "button" class="delete">
              <img src="./images/icon-delete.svg" alt="" />
            </button>
  `;
  cartList.appendChild(cartItem);
  icon_count.style.display = "block";
  icon_count.textContent = cartItemID;
  cartItemID++;
}

const handleIncrement = () => {
  count++;
  value_count.innerHTML = count;
};

const handleDecrement = () => {
  count--;
  if (count < 0) {
    return count = 0;
  }
  value_count.innerHTML = count;
};

next.addEventListener("click", () =>{
  if (currentImgIndex === modal_images.length - 1) {
    currentImgIndex = 0;
} else {
    currentImgIndex++;
}
modal__product__img.src = modal_images[currentImgIndex].src.replace("-thumbnail", "");
});

previous.addEventListener("click", () =>{
  if (currentImgIndex === 0) {
    currentImgIndex = modal_images.length - 1;
} else {
    currentImgIndex--;
}
modal__product__img.src = modal_images[currentImgIndex].src.replace("-thumbnail", "");
});

plus.addEventListener("click", handleIncrement);
minus.addEventListener("click", handleDecrement);

add__to__cart.addEventListener("click", addToCartList);

cart_icon.addEventListener("click", () => {
  cart.classList.toggle("active_cart");
})