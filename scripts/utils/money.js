export function currencyFormat(priceCent) {
    return (Math.round(priceCent) / 100).toFixed(2);
}