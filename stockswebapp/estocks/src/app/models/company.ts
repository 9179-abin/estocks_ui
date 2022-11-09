import { Stock } from "./stock";

export class Company {
    companyCode: string;
    companyName: string;
    companyCeo: string;
    turnover: number;
    website: string;
    stockExchange: string;
    stockList?: Stock[];

    constructor(
        companyCode: string,
        companyName: string,
        companyCeo: string,
        turnover: number,
        website: string,
        stockExchange: string,
        stockList?: Stock[]
    ) {
        this.companyCode = companyCode
        this.companyName = companyName
        this.companyCeo = companyCeo
        this.turnover = turnover
        this.website = website
        this.stockExchange = stockExchange
        this.stockList = stockList
    }

}