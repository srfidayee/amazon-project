import { cart, addToCart, loadFromStorage } from "../../data/cart.js";

describe('test suite: add to cart', () => {

    it('adds product to existing cart', () => {

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        const qtyInput = document.createElement('input');
        qtyInput.classList.add('js-quantity-selector-54e0eccd-8f36-462b-b68a-8182611d9add');
        qtyInput.value = '1';
        document.body.appendChild(qtyInput);

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(2);

        document.body.removeChild(qtyInput);
    });

    it('adds new product to cart', () => {

        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();

        const qtyInput = document.createElement('input');
        qtyInput.classList.add('js-quantity-selector-54e0eccd-8f36-462b-b68a-8182611d9add');
        qtyInput.value = '1';
        document.body.appendChild(qtyInput);

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(1);
        document.body.removeChild(qtyInput);
    });
})