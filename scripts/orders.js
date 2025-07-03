import {
    getCart,
    removeFromCart,
    updateDeliveryOption,
    loadFromStorage
} from "../data/cart.js";

import { products, getProduct } from "../data/products.js";
import { formatCurrency } from "../utilities/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
    deliveryOptions,
    getDeliveryOption
} from "../data/deliveryOptions.js";
loadFromStorage()
const cart = getCart()
let ordersHTML = '';

cart.forEach((cartItem) => {
    const matchingProduct = products.find(product => product.id === cartItem.productId);
    const product = products.find(p => p.id === cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
    if (!product || !deliveryOption) return;
    const placedDate = dayjs().format('MMMM D')
    const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('MMMM D');
    const totalPrice = formatCurrency();
    function renderPriceSummary() {
        const cart = getCart();
        let totalProductPriceCents = 0;
        let totalShippingCents = 0;

        cart.forEach((cartItem) => {
            const product = getProduct(cartItem.productId);
            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

        });
        totalProductPriceCents += product.priceCents * cartItem.quantity;
        totalShippingCents += deliveryOption.priceCents;

        const totalBeforeTaxCents = totalProductPriceCents + totalShippingCents;
        const taxCents = totalBeforeTaxCents * 0.1;
        const totalCents = totalBeforeTaxCents + taxCents;


        ordersHTML += `
   <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${placedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(totalCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${matchingProduct.id}</div>
            </div>
          </div>

           <div class="order-details-grid js-orders">
            <div class="product-image-container">
              <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                  ${matchingProduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${dateString}
              </div>
              <div class="product-quantity">
                Quantity: ${cartItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
          </div>
        </div>
  `
    }
    renderPriceSummary()
})

document.querySelector('.js-orders-container').innerHTML = ordersHTML;

let cartQuantity = 0;
cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
});

document.querySelector('.cart-quantity').innerHTML = cartQuantity;