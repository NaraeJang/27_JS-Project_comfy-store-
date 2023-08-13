// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count"),
  cartItemsDOM = getElement(".cart-items"),
  cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");

export const addToCart = (id) => {
  // check if the item is in the cart.
  let item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    let product = findProduct(id);
    // add item to the cart.
    product = { ...product, amount: 1 };
    cart = [...cart, product];
    // add item to the DOM.
    addToCartDOM(product);
    console.log(cart);
  } else {
    // update values
  }

  // add one to the item count
  displayCartItemCount();
  // display Cart totals
  displayCartTotal();
  // set cart in the storage
  setStorageItem("cart", cart);
  openCart();
};

function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    return (total += cartItem.amount);
  }, 0);
  cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);

  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

// function displayCartTotal() {}
const init = () => {
  console.log(cart);
};

init();
