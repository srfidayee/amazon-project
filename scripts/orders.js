import { orders } from "../data/orders.js";
import { currencyFormat } from "./utils/money.js";
import { getProduct, loadProductsFetch, products } from "../data/products.js";
import dayJS from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { addToCart } from "../data/cart.js";



async function loadPage() {
    await loadProductsFetch();
    renderOrdersSummary();
}

loadPage();

function renderOrdersSummary() {
    let ordersSummaryHTML = '';
    orders.forEach((order) => {

        ordersSummaryHTML += `
        <div class="order-container">

            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${dayJS(order.orderTime).format('MMMM D')}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${currencyFormat(order.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${orderItemHTML(order)}
            </div>
        </div>
    `;

    })

    function orderItemHTML(order) {
        let html = '';
        console.log("Products array at runtime:", products);
        order.products.forEach((product) => {
            let matchingProduct = getProduct(product.productId);

            if (!matchingProduct) {
                console.warn(`Product not found for ID: ${product.productId}`);
                console.log(order);
                return;
            }

            html += `
            <div class="product-image-container">
                <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dayJS(product.estimatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button js-buy-again-button button-primary" data-product-id="${matchingProduct.id}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${matchingProduct.id}">
                    <button class="track-package-button js-track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
        });

        return html;
    }

    document.querySelector('.orders-grid').innerHTML = ordersSummaryHTML;

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            const { productId } = button.dataset;

            addToCart(productId);
            window.location.href = "checkout.html"
        })
    })

}