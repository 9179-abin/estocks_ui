export class Stock {
    stockPrice: number;
    stockPriceUpdateOn: string;

    constructor(stockPrice: number, stockPriceUpdateOn: string) {
        this.stockPrice = stockPrice
        this.stockPriceUpdateOn = stockPriceUpdateOn
    }

}