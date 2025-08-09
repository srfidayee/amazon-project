import { cart, removeFromCart, calculateCartQuantity, updateCartQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { currencyFormat } from './utils/money.js';

let cartOrderSummaryHTML = '';

cart.forEach((cartItem) => {

    let productId = cartItem.productId;
    let matchingProduct;

    products.forEach((product) => {
        if(product.id === productId){
            matchingProduct = product;
        }
    });

    cartOrderSummaryHTML += 
    `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
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
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="delivery-option-${productId}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

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
        
        if(event.key === 'Enter'){
            const { productId } = link.dataset;
    
            saveCartQuantity(productId);
        }
    })
})
