import dayJS from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}]

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if (option.id == deliveryOptionId) {
            deliveryOption = option;
        }
    })

    return deliveryOption || deliveryOptions[0];
}

export function getDeliveryDate(deliveryOptionId) {

    const option = getDeliveryOption(deliveryOptionId);
    let deliveryDate = dayJS();
    let remainingDays = option.deliveryDays;

    while(remainingDays > 0) {

        deliveryDate = deliveryDate.add(1, 'day');
        if(deliveryDate.format('dddd') !== 'Saturday' && deliveryDate.format('dddd') !== 'Sunday'){
            remainingDays--;
        }
    }
    const dateString = deliveryDate.format('dddd, MMMM D');
    return dateString;
}