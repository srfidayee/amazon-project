import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { currencyFormat } from './utils/money.js';


let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                ${product.getRatingURL()}
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()/*Polymorphism*/}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button js-add-to-cart button-primary" data-product-id = ${product.id}>
                Add to Cart
            </button>
        </div>
    `;
})

document.querySelector('.js-products-grid').innerHTML = productsHTML;

let timeOutIds = [];

calculateCartQuantity('.js-cart-quantity');

function displayAddedToCart(productId) {
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('opacity-full');

    if (timeOutIds[productId]) {
        clearTimeout(timeOutIds[productId]);
    }

    timeOutIds[productId] = setTimeout(() => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('opacity-full');
    }, 2000);
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        const { productId } = button.dataset;

        addToCart(productId);
        calculateCartQuantity('.js-cart-quantity');
        displayAddedToCart(productId);

    })
})