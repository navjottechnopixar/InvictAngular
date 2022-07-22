import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { MessagingService } from 'src/app/services/messaging.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {
  masterList: any = [];

  dashBoradData: any;
  basePath: any;
  constructor(
    private http: HttpService,
    private message: MessagingService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMasterList();
    this.basePath = environment.ImagePath;
    console.log(this.basePath);
  }

  getMasterList(){
    this.http.getData(Api.superAdmin.masterList.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.masterList = (response.data && response.data.length) ? response.data : [];
        console.log(this.masterList);
      }
    })
  }

  changeMasterStatus(id: any, event: any){
    this.message.confirm('change status').then(data => {
      if (data.value) {
        // 
        let currentStatus = event.target.checked;
        let status = (currentStatus) ? 1 : 0;
        this.http.postData(`${Api.superAdmin.masterList.updateStatus}?masterDetailId=${id}&status=${status}`, {})
        .subscribe(response => {
          if(response && response.status == 200){
            if(response.success){
              this.message.toast('success', `Status updated successfully`);
            }
            else{
              this.message.toast('error', response.message);
            }
          }
        })
        // 
      }
      else{
        event.target.checked = !event.target.checked;
      }
    });
  }

  editMaster(ep: any) {
    this.router.navigate(['/superAdmin/master-list/add-edit'],
      {
        queryParams: {
          id: ep.id
        }
      })
  }
}
