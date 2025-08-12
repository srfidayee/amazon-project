import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartOrderSummary } from "./checkout/cartOrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import "../data/cart-class.js";

loadProducts(() => {
    renderCheckoutHeader();
    renderCartOrderSummary();
    renderPaymentSummary();
})

// renderCheckoutHeader();
// renderCartOrderSummary();
// renderPaymentSummary();