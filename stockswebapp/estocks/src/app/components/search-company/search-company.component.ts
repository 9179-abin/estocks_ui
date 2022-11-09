import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.scss']
})
export class SearchCompanyComponent implements OnInit {
  searchInput = '';
  isSearching = false;
  searchFocused = false;

  constructor(private companyService: CompanyService, private router: Router, private snackBar: MatSnackBar, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  onSearchClick() {
    this.searchFocused = true; 
    this.searchInput = '';
    this.document.getElementById('search-input')?.focus();
  }

  searchCompany() {
    this.isSearching = true;
    this.companyService.getCompanyByCode(this.searchInput).subscribe((res: any) => {
      this.searchFocused = false;
      this.searchInput = '';
      this.isSearching = false;
      this.router.navigate(['companies/' + res?.companyCode]);
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
        this.isSearching = false;
      });
  }

}
