import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartOrderSummary } from "./checkout/cartOrderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import "../data/cart-class.js";


// async makes a function return a promise
// await makes it wait to finish before moving to next line
// async await is a better way to handle ansynchronous code as it lets us write async code like normal code
//                                                                                           (line-by-line)

async function loadPage() {
    await loadProductsFetch();  // await can only be used in immediate async function
    await loadCartFetch();

    renderCheckoutHeader();
    renderCartOrderSummary();
    renderPaymentSummary();

    return 'value';      //    return values to the function (do const value = async function())
}

loadPage();


/*
// Promise all --- Using Fetch instead of XML
// Fetch uses promises unlike XML which uses Callbacks

Promise.all([
    loadProductsFetch(),
    loadCartFetch()
]).then(()=> {
    renderCheckoutHeader();
    renderCartOrderSummary();
    renderPaymentSummary();
});
*/

/*
// Promise all -- All promises in array run at the same time, move to next step after all have finished 
// Using XML which uses Callbacks

Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve();
        })
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
]).then(()=> {
    renderCheckoutHeader();
    renderCartOrderSummary();
    renderPaymentSummary();
});
*/

/*
Promises -- wait for one promise to finish then move on to next

new Promise((resolve) => {
    loadProducts(() => {
        resolve('hello'); // this value is passeed to next step
    })
}).then((value) => {
    console.log(value);   // it contains value from previous step ('hello')
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })
}).then(() => {
    renderCheckoutHeader();
    renderCartOrderSummary();
    renderPaymentSummary();
})
*/

/*
Nested Callbacks -- NOT Recommended! too much nesting causes indentation problems
loadProducts(() => {
    loadCart(() => {
        renderCheckoutHeader();
        renderCartOrderSummary();
        renderPaymentSummary();
    })
})
*/

/*
Callbacks

loadProducts(() => {
    renderCheckoutHeader();
    renderCartOrderSummary();
    renderPaymentSummary();
})
*/

// renderCheckoutHeader();
// renderCartOrderSummary();
// renderPaymentSummary();