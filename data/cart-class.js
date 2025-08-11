class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
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
        ];
    }

    saveTOLocalStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {

        let itemQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`)?.value);

        let matchingItem = this.cartItems.find(item => productId === item.productId);
        
        if (matchingItem) {
            matchingItem.quantity += itemQuantity;
        }
        else {
            this.cartItems.push({
                productId,
                quantity: itemQuantity,
                deliveryOptionId: '1'
            });
        }

        this.saveTOLocalStorage();
    }

    removeFromCart(productId) {
        
        this.cartItems = this.cartItems.filter(item => item.productId !== productId);
        this.saveTOLocalStorage();
    }

    calculateCartQuantity(qtyClass) {
        let cartQuantity = 0;

        this.cartItems.forEach((item) => {
            cartQuantity += item.quantity;
        })

        document.querySelector(qtyClass).innerHTML = cartQuantity;
    }

    updateCartQuantity(productId, quantity){
        this.cartItems.forEach((item) => {
            if(item.productId === productId){
                item.quantity = quantity;
            }
        })

        this.saveTOLocalStorage();
        return true;
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item;
            }
        })

        if(!matchingItem) return;
        
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveTOLocalStorage();
    }

}

const cart = new Cart('cart-oop');
cart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b');

const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
