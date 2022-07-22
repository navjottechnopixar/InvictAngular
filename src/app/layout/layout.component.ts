import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  show: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  /********* Toggle side nav **********/
  sideNavDisplay(event:any) {
    this.show = event;
  }
}
