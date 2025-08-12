export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveTOLocalStorage();
}

function saveTOLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}