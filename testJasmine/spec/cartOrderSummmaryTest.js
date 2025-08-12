import { renderCartOrderSummary } from "../../scripts/checkout/cartOrderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: cartOrderSummary', () => {

    /* beforeAll((done) => { // done is Jasmine function which lets the next codes run only after this   
                                has finished
        loadProducts(done);
    })*/

    beforeAll((done) => {
        loadProductsFetch().then(done);
    })

    beforeEach(() => {
        document.querySelector('.js-test-container').innerHTML =
            `
            <div class="js-order-summary"></div>
            <div class="js-checkout-header"></div>
            <div class="js-payment-summary"></div>
        `;

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });

        loadFromStorage();

        renderCartOrderSummary();
    })
    it('displays cart order', () => {

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        expect(document.querySelector('.js-product-quantity-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Quantity: 2');
        expect(document.querySelector('.js-product-quantity-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText).toContain('Quantity: 1');

        expect(document.querySelector('.js-product-name-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').innerText).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');
    })

    it('removes a product', () => {

        document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector('.js-cart-item-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6')).toEqual(null);
        expect(document.querySelector('.js-cart-item-container-15b6fc6f-327a-4ec4-896f-486349e85a3d')).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(document.querySelector('.js-product-name-15b6fc6f-327a-4ec4-896f-486349e85a3d').innerText).toContain('Intermediate Size Basketball');
    });

    it('updates the delivery option', () => {
        document.querySelector('.js-delivery-option-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').click();

        expect(document.querySelector('.js-delivery-option-input-e43638ce-6aa0-4b85-b27f-e1d07eb678c6-3').checked).toEqual(true);

        expect(cart.length).toEqual(2);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].deliveryOptionId).toEqual('3');
        expect(document.querySelector('.js-shipping-money').innerText).toEqual(`$14.98`);
        expect(document.querySelector('.js-total-money').innerText).toEqual(`$63.50`);
    })

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })
})
