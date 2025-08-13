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

    const url = new URL(window.location.href);      // create URL object to get access to page's URL
    const orderId = url.searchParams.get('orderId');    // get orderId from URL
    const productId = url.searchParams.get('productId');    // get productId from URL

    let order = orders.find(order => order.id === orderId);
    let product = products.find(product => product.id === productId);

    let orderProduct = order.products.find(p => p.productId === productId); // find specific product in order

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
            <div class="progress-bar js-progress-bar"></div>
        </div>
    `;

    document.querySelector('.order-tracking').innerHTML = trackingSummaryHTML;

    let currentTime = dayJS();
    let orderTime = dayJS(order.orderTime);
    let deliveryTime = dayJS(orderProduct.estimatedDeliveryTime);

    const progressWidth = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100; // calculate progress bar width

    document.querySelector('.js-progress-bar').style.width = `${progressWidth}%`;
}