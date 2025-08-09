import { cart, removeFromCart, calculateCartQuantity, updateCartQuantity, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { currencyFormat } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayJS from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let cartOrderSummaryHTML = '';

cart.forEach((cartItem) => {

    let productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    let deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            deliveryOption = option;
        }
    })

    const today = dayJS();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartOrderSummaryHTML +=
        `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        ${currencyFormat(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                            Update
                        </span>
                        <input class="quantity-input js-quantity-input" data-product-id = "${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">
                            Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
            </div>
        </div>
    `
})


function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((option) => {

        const today = dayJS();
        const deliveryDate = today.add(option.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = option.priceCents === 0 ? 'FREE' : `$${currencyFormat(option.priceCents)} -`;

        const isChecked = option.id === cartItem.deliveryOptionId;

        html +=
            `
            <div class="delivery-option js-delivery-option"
                data-product-id = "${matchingProduct.id}"
                data-delivery-option-id = "${option.id}"
            >
                <input type="radio" class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                    ${isChecked ? 'checked' : ''}
                >
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                </div>
            </div>
        `;
    });

    return html;
}


document.querySelector('.js-order-summary').innerHTML = cartOrderSummaryHTML;

calculateCartQuantity('.js-cart-quantity-link');

document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;

        removeFromCart(productId);
        calculateCartQuantity('.js-cart-quantity-link');

        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    })
})

document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;

        document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
    })
})

function saveCartQuantity(productId) {
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    const quantity = Number(container.querySelector('.js-quantity-input').value);

    updateCartQuantity(productId, quantity);

    container.querySelector('.quantity-label').innerHTML = quantity;
    calculateCartQuantity('.js-cart-quantity-link');
    container.classList.remove('is-editing-quantity');
}

document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
        const { productId } = link.dataset;

        saveCartQuantity(productId);
    })
})

document.querySelectorAll('.js-quantity-input').forEach((link) => {
    link.addEventListener('keydown', (event) => {

        if (event.key === 'Enter') {
            const { productId } = link.dataset;

            saveCartQuantity(productId);
        }
    })
})

document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {

        const { productId, deliveryOptionId } = element.dataset;

        updateDeliveryOption(productId, deliveryOptionId);
    })
})