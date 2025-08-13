import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import dayJS from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';


async function loadPage() {
    await loadProductsFetch();
    renderTrackingSummary();
}

loadPage();

function renderTrackingSummary() {
    let trackingSummaryHTML = '';

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    let order = orders.find(order => order.id === orderId);
    let product = products.find(product => product.id === productId);

    let orderProduct = order.products.find(p => p.productId === productId);
    // let quantity = orderProduct ? orderProduct.quantity : 0;

    trackingSummaryHTML +=
    `
        <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
        </a>

        <div class="delivery-date">
            Arriving on ${dayJS(orderProduct.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
            ${product.name}
        </div>

        <div class="product-info">
            Quantity: ${orderProduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
        </div>

        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.order-tracking').innerHTML = trackingSummaryHTML;
}