import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick(event: string) {
    if (sessionStorage.getItem('isAuthenticated') !== 'TRUE') {
      this.dialog.open(LoginComponent, { panelClass: 'dialog-cross' })
    } else if (event === 'register') {
      this.router.navigate(['register']);
    } else if (event === 'companies') {
      this.router.navigate(['companies']);
    }
  }

}
