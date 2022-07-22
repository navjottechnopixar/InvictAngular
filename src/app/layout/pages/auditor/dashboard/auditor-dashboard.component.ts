import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';

@Component({
  selector: 'app-auditor-dashboard',
  templateUrl: './auditor-dashboard.component.html',
  styleUrls: ['./auditor-dashboard.component.css']
})
export class AuditorDashboardComponent implements OnInit {
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
