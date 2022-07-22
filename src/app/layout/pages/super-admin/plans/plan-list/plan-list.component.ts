import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  planList:any = [];
  constructor(
    private http: HttpService,
    private router: Router,
    private message: MessagingService
  ) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(){
    this.http.getData(Api.superAdmin.plans.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        this.planList = (response.data && response.data.length) ? response.data : [];
      }
    })
  }

  editPlan(ep: any) {
    this.router.navigate(['/superAdmin/plans/add-edit'],
      {
        queryParams: {
          id: ep.planId
        }
      })
  }

  changePlanStatus(id: any, event: any){
    this.message.confirm('change status').then(data => {
      if (data.value) {
        // 
        let currentStatus = event.target.checked;
        let payload = {
          masterDetailId: id,
          status: (currentStatus) ? 1 : 0
        }
        let status = (currentStatus) ? 1 : 0;
        this.http.postData(`${Api.superAdmin.plans.updateStatus}?planId=${id}&status=${status}`, {})
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

}
