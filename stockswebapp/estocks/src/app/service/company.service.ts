import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }

  getAllCompanies() {
    return this.httpClient.get(environment.FETCH_ALL_COMPANIES_URL, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    });
  }

  getCompanyByCode(companyCode: string) {
    return this.httpClient.get(environment.FETCH_ALL_STOCKS_URL + '/' + companyCode, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    });
  }

  registerCompany(company: Company) {
    return this.httpClient.post(environment.REGISTER_COMPANY_URL, company, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    });
  }

  addStockPrice(companyCode: string, stockPrice: string) {
    return this.httpClient.get(environment.ADD_STOCK_PRICE_URL + '/' + companyCode + '/' + stockPrice, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    });
  }

  deleteCompany(companyCode: string) {
    return this.httpClient.delete(environment.DELETE_COMPANY_URL + '/' + companyCode, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    });
  }

}
