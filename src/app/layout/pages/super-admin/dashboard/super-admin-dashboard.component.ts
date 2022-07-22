import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';

@Component({
  selector: 'app-super-admin-dashboard',
  templateUrl: './super-admin-dashboard.component.html',
  styleUrls: ['./super-admin-dashboard.component.css']
})
export class SuperAdminDashboardComponent implements OnInit {
  page: number = 1;
  pageSize: number = 20
  newsLetterList: any = []

  dashBoradData: any
  constructor(
    private http: HttpService,
  ) { }

  ngOnInit(): void {
    this.getDashboardData()
    this.getNewsLetterList();
  }

  getDashboardData() {

  }


  getNewsLetterList() {
    let params = {
      page: this.page,
      page_size: this.pageSize
    }
  }
}
