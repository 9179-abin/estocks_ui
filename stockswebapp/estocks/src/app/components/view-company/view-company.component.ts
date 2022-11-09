import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from 'src/app/models/stock';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.scss']
})
export class ViewCompanyComponent implements OnInit {
  loading = false;
  columns = [
    {
      columnDef: 'stockPrice',
      header: 'Stock Price',
      cell: (element: Stock) => `${element.stockPrice}`,
    },
    {
      columnDef: 'stockPriceUpdateDate',
      header: 'Date',
      cell: (element: Stock) => `${new Date(element.stockPriceUpdateOn).toLocaleDateString()}`,
    },
    {
      columnDef: 'stockPriceUpdateTime',
      header: 'Time',
      cell: (element: Stock) => `${new Date(element.stockPriceUpdateOn).toLocaleTimeString()}`,
    }
  ];
  stockList: any[] = [];
  stocks: Stock[] = [];
  displayedColumns = this.columns.map(c => c.columnDef);
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  companyCode = '';
  details = {
    companyName: '', ceoName: '', turnover: '', website: '', exchange: '', maxStock: 0, avgStock: 0, minStock: 0
  };
  stockPrice = 0;
  editStock = false;
  isUpdating = false;
  userRole = '';
  filterRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor(private companyService: CompanyService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe(params => this.companyCode = params.get('companyCode') || '');
   }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') || 'USER';
    this.getAllStocks();
  }

  getAllStocks() {
    this.loading = true;
    this.companyService.getCompanyByCode(this.companyCode).subscribe((res: any) => {
      this.stocks = res?.stockList || [];
      this.stocks.reverse().splice(-1);
      this.length = this.stocks.length;
      this.details.companyName = res?.companyName;
      this.details.ceoName = res?.companyCeo;
      this.details.turnover = res?.turnover;
      this.details.website = res?.website;
      this.details.exchange = res?.stockExchange;
      this.details.maxStock = Math.max(...this.stocks.map(stock => stock.stockPrice));
      this.details.avgStock = +(this.stocks.map(stock => stock.stockPrice).reduce((a, b) => a + b, 0) / this.length).toFixed(2);
      this.details.minStock = Math.min(...this.stocks.map(stock => stock.stockPrice));
      this.stockList = this.stocks.slice(0, this.pageSize);
      this.stockPrice = this.stocks[0].stockPrice;
      this.loading = false;
    },
      err => {
        console.error(err);
        if (err.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['']);
        }
        const message = err?.error?.message || 'Something went wrong. Please try again.';
        if (message === 'Company not available in our records. Please try with valid input.') {
          this.router.navigate(['companies']);
        }
        this.snackBar.open(message, 'Dismiss', {
          duration: 5000
        });
        this.loading = false;
      });
  }

  updateStockPrice() {
    this.isUpdating = true;
    this.companyService.addStockPrice(this.companyCode, this.stockPrice + '').subscribe(response => {
      this.isUpdating = false;
      this.editStock = false;
      this.getAllStocks();
    }, err => {
      console.error(err);
      if (err.status === 401) {
        sessionStorage.clear();
        this.router.navigate(['']);
      }
      const message = err?.error?.message || 'Something went wrong. Please try again.';
      this.snackBar.open(message, 'Dismiss', {
        duration: 5000
      });
      this.isUpdating = false;
      this.editStock = false;
    });
  }

  handlePagination(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.stockList = this.stocks.slice(this.pageSize * pageEvent.pageIndex, (this.pageSize * pageEvent.pageIndex) + this.pageSize);
  }

}
