export let cart = JSON.parse(localStorage.getItem('cart')) || [
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

export function saveTOLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {

    let itemQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    })

    if (matchingItem) {
        matchingItem.quantity += itemQuantity;
    }
    else {
        cart.push({
            productId,
            quantity: itemQuantity,
            deliveryOptionId: '1'
        });
    }

    saveTOLocalStorage();
}

export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((item) => {
        if(item.productId !== productId) {
            newCart.push(item);
        }
    })

    cart = newCart;

    saveTOLocalStorage();
}

export function calculateCartQuantity(qtyClass) {
    let cartQuantity = 0;

    cart.forEach((item) => {
        cartQuantity += item.quantity;
    })

    document.querySelector(qtyClass).innerHTML = cartQuantity;
}

export function updateCartQuantity(productId, quantity){
    cart.forEach((item) => {
        if(item.productId === productId){
            item.quantity = quantity;
        }
    })

    saveTOLocalStorage();
    return true;
}