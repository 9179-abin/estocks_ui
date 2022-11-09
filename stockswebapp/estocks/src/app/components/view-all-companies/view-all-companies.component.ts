import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-view-all-companies',
  templateUrl: './view-all-companies.component.html',
  styleUrls: ['./view-all-companies.component.scss']
})
export class ViewAllCompaniesComponent implements OnInit {
  loading = false;
  columns = [
    {
      columnDef: 'companyCode',
      header: 'Company Code',
      cell: (element: Company) => `${element.companyCode}`,
    },
    {
      columnDef: 'companyName',
      header: 'Name',
      cell: (element: Company) => `${element.companyName}`,
    },
    {
      columnDef: 'companyCeo',
      header: 'CEO',
      cell: (element: Company) => `${element.companyCeo}`,
    },
    {
      columnDef: 'turnover',
      header: 'Turnover',
      cell: (element: Company) => `${element.turnover}`,
    },
    {
      columnDef: 'website',
      header: 'Website',
      cell: (element: Company) => `${element.website}`,
    },
    {
      columnDef: 'stockExchange',
      header: 'Exchange',
      cell: (element: Company) => `${element.stockExchange}`,
    },
    {
      columnDef: 'stockPrice',
      header: 'Stock Price',
      cell: (element: Company) => `${(element.stockList && element.stockList[element.stockList.length - 1].stockPrice) || 0.00}`,
    },
    {
      columnDef: 'deleteAction',
      header: '',
      cell: (element: Company) => ``,
    }
  ];
  companyList: any[] = [];
  companies: Company[] = [];
  displayedColumns = this.columns.map(c => c.columnDef);
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 50];
  stockPrice: number[] = [];
  editStock: boolean[] = [];
  isUpdating: boolean[] = [];
  tobeDeleted: any;
  userRole = '';

  constructor(private companyService: CompanyService, private snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('userRole') || 'USER';
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.loading = true;
    this.companyService.getAllCompanies().subscribe((res: any) => {
      this.companies = res;
      this.length = this.companies.length;
      this.companyList = this.companies.slice(0, this.pageSize);
      this.loading = false;
    },
      err => {
        console.error(err);
        if (err.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['']);
        }
        const message = err?.error?.message || 'Something went wrong. Please try again.';
        this.snackBar.open(message, 'Dismiss', {
          duration: 5000
        });
        this.loading = false;
      });
  }

  updateStockPrice(companyCode: string, stockPrice: number, ind: number) {
    this.isUpdating[ind] = true;
    this.companyService.addStockPrice(companyCode, stockPrice + '').subscribe(response => {
      this.isUpdating[ind] = false;
      this.editStock[ind] = false;
      this.getAllCompanies();
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
      this.isUpdating[ind] = false;
      this.editStock[ind] = false;
    });
  }

  onClickDelete(company: Company, popupContent: any) {
    this.tobeDeleted = company;
    this.dialog.open(popupContent, { panelClass: 'dialog-cross' });
  }

  deleteCompany(companyCode: string) { 
    this.loading = true;
    this.companyService.deleteCompany(companyCode).subscribe(response => {
      this.loading = false;
      this.tobeDeleted = null;
      this.dialog.closeAll();
      window.location.reload();
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
      this.tobeDeleted = null;
      this.loading = false;
      this.dialog.closeAll();
    });
  }

  handlePagination(pageEvent: PageEvent) {
    this.pageSize = pageEvent.pageSize;
    this.companyList = this.companies.slice(this.pageSize * pageEvent.pageIndex, (this.pageSize * pageEvent.pageIndex) + this.pageSize);
  }

}
