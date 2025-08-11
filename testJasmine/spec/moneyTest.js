import { currencyFormat } from "../../scripts/utils/money.js";

describe('test suite: currencyFormat', () => {
    it('converts cents to dollars', () => {
        expect(currencyFormat(2095)).toEqual('20.95')
    });
    it('works for 0', () => {
        expect(currencyFormat(0)).toEqual('0.00')
    });
    it('rounds upto nearest cent', () => {
        expect(currencyFormat(2000.5)).toEqual('20.01')
    })
    it('rounds down to nearest cent', () => {
        expect(currencyFormat(2000.4)).toEqual('20.00')
    })
    it('works with negative numbers', () => {
        expect(currencyFormat(-1960)).toEqual('-19.60')
    })
});