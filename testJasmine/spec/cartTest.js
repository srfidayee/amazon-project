import { cart, addToCart, loadFromStorage, removeFromCart } from "../../data/cart.js";

describe('test suite: add to cart', () => {

    const qtyInput = document.createElement('input');

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        qtyInput.classList.add('js-quantity-selector-54e0eccd-8f36-462b-b68a-8182611d9add');
        qtyInput.value = '1';
        document.querySelector('.js-test-container').appendChild(qtyInput);
    })

    it('adds product to existing cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
            JSON.stringify([
                {
                    productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity: 2,
                    deliveryOptionId: '1'
                }
            ])
        );

    });

    it('adds new product to cart', () => {

        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
            JSON.stringify([
                {
                    productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ])
        );        
    });

    afterEach(() => {
        document.querySelector('.js-test-container').removeChild(qtyInput);
    })
})


describe('test suite: removeFromCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
    })
    it('removes an item that is in the cart', () => {
        removeFromCart('54e0eccd-8f36-462b-b68a-8182611d9add');

        expect(cart.length).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
        
    });

    it('does nothing when trying to remove an item which doesnt exist it cart', () => {
        removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
            JSON.stringify([
                {
                    productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ])
        );
    })
})