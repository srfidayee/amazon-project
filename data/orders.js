export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveTOLocalStorage();
}

function saveTOLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}
/*
How order array looks like
'[{
    "id":"22447833-6949-40a8-b8e6-4acd84cb91c2",
    "orderTime":"2025-08-12T11:42:26.763Z",
    "totalCostCents":5251,
    "products":[
        {
            "productId":"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            "quantity":2,
            "estimatedDeliveryTime":"2025-08-19T11:42:26.763Z",
            "variation":null},
        {
            "productId":"15b6fc6f-327a-4ec4-896f-486349e85a3d",   
            "quantity":1,
            "estimatedDeliveryTime":"2025-08-15T11:42:26.763Z",
            "variation":null}
    ]
}]'
*/