import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    if (sessionStorage.getItem('isAuthenticated') !== 'TRUE') {
      return false;
    } else {
      return true;
    }
  }

  onClick(event: string) {
    if (event === 'logo') {
      this.router.navigateByUrl('/');
    } else if (event === 'login') {
      this.dialog.open(LoginComponent, { panelClass: 'dialog-cross' })
    } else if (event === 'logout') {
      sessionStorage.clear();
      this.router.navigate(['']);
    }
  }

}
