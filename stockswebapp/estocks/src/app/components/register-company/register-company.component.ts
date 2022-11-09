import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.scss']
})
export class RegisterCompanyComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private companyService: CompanyService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      companyCode: ['', [Validators.required, Validators.pattern(/^[A-za-z][A-za-z0-9]*$/), Validators.minLength(4)]],
      companyCeo: ['', [Validators.required, Validators.pattern(/^[A-za-z][A-za-z .']*$/), Validators.minLength(2)]],
      companyName: ['', [Validators.required, Validators.pattern(/^[A-za-z][A-za-z0-9 .']*$/), Validators.minLength(2)]],
      stockExchange: ['', Validators.required],
      turnover: ['', [Validators.required, Validators.pattern(/^[\d]*$/), Validators.min(100000000)]],
      website: ['', [Validators.required]]
    });
  }

  submit() {
    this.loading = true;
    this.companyService.registerCompany(this.registrationForm.value).subscribe(response => {
      this.loading = false;
      this.snackBar.open('Company is successfully registered', '', {
        duration: 2000
      });
      this.router.navigateByUrl('/');
    },
      error => {
        this.loading = false;
        console.error(error);
        if (error.status === 401) {
          sessionStorage.clear();
          this.router.navigate(['']);
        }
        const message = error && error.error && error.error.message ? error.error.message : 'Something went wrong. Please try again.';
        this.snackBar.open(message, 'Dismiss', {
          duration: 5000
        });
      });
  }

}
