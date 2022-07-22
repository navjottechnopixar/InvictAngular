import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-site-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit {
  sitesList:any = [];
  constructor(
    private http: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSites();
  }

  getSites(){
    this.http.getData(Api.superAdmin.sites.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.sitesList = (response.data && response.data.length) ? response.data : [];
      }
    })
  }

  editSite(ep: any) {
    this.router.navigate(['/superAdmin/sites/add-edit'],
      {
        queryParams: {
          id: ep.siteId
        }
      })
  }

}
