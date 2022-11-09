import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  submit() {
    this.loading = true;
    this.authService.authenticate(this.loginForm.value.userName, this.loginForm.value.password).subscribe(response => {
      this.dialog.closeAll();
      sessionStorage.setItem('token', response.token);
      const userData = atob(response.token.split('.')[1]);
      sessionStorage.setItem('userData', JSON.stringify(JSON.parse(userData)));
      sessionStorage.setItem('userRole', JSON.parse(userData).role);
      sessionStorage.setItem('isAuthenticated', 'TRUE');
      this.router.navigate(['/']);
      this.loading = false;
    },
      error => {
        console.error(error);
        const message = error && error.error && error.error.message ? error.error.message : 'Something went wrong. Please try again.';
        this.snackBar.open(message, 'Dismiss', {
          duration: 5000
        });
        sessionStorage.setItem('isAuthenticated', 'FALSE');
        this.loading = false;
      });
  }
}
