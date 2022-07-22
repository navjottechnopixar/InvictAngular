import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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

    // this.http.getData(Api.dashboardStats, {}).subscribe(response => {
    //   if (response && response.status == 200) {
    //     this.dashBoradData = response.data
    //   }
    // })
  }


  getNewsLetterList() {
    let params = {
      page: this.page,
      page_size: this.pageSize
    }
    // this.http.getData(Api.newsLetter, params).subscribe(response => {
    //   if (response && response.status == 200) {
    //     // this.pagination.count = response.data.count
    //     this.newsLetterList = response.data.list
    //   }
    // })
  }
}
