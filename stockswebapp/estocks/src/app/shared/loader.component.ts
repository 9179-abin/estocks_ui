import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
  <div class="overlay">
    <div class="pos-center">
        <mat-spinner></mat-spinner>
    </div>
  </div>`,
    styles: [
        `.pos-center {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }`,
        `.overlay {
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 10;
    top: 0;
    left: 0;
    position: fixed;
  }`]
})
export class LoaderComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
