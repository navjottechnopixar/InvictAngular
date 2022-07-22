import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Litepicker } from 'litepicker';
import { HttpService } from 'src/app/services/http.service';
import { Api } from 'src/app/utils/apis';
import { Router } from '@angular/router';
import { MessagingService } from 'src/app/services/messaging.service';
declare var $: any;
@Component({
  selector: 'app-filters-detail',
  templateUrl: './filters-detail.component.html',
  styleUrls: ['./filters-detail.component.css']
})
export class FiltersDetailComponent implements OnInit,OnChanges {

  @Input() enableEnterprise: boolean = true
  @Input() enableEnterpriseGroup: boolean = true
  @Input() enableStartDate: boolean = false
  @Input() enableEndDate: boolean = false
  @Input() enableSortBy: boolean = false
  @Input() enableSearch: boolean = false
  @Input() enableAddEdit: boolean = false
  @Input() enableBulkUpload: boolean = false
  @Input() permissionCreate:any;
  @Input() IsPermissions:boolean = false;

  @Output() filterOutputs = new EventEmitter<any>();
  @Output() clearFilter = new EventEmitter<boolean>();

  enterPriseList: Array<any> = [];
  enterPriseGroupList: Array<any> = [];
  searchField: string = '';
  activityDetail: any = {}
  selectedId: string = ''
  filterForm: any;
   

  constructor(
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private message: MessagingService,
  ) {

    this.createFilterForm();
   }

  ngOnInit(): void {
    new Litepicker({
      element: document.getElementById('datepicker') as HTMLInputElement,
      singleMode: false,
      tooltipText: {
        one: 'day',
        other: 'days'
      },
      format: 'DD/MM/YY',
      setup: (picker) => {
      picker.on('selected', (date1, date2) => {
        this.filterForm.patchValue({
          start_date: date1.dateInstance,
          end_date: date2.dateInstance,
        });
      });
    }
    });
  
  }

  ngOnChanges() {
    if (this.enableEnterpriseGroup) {
      this.getEnterpriseGroupData();
    }
    this.route.queryParams.subscribe(param => {
      if(param['gid']) {
        this.filterForm.patchValue({enterprise_group: param['gid']});
        this.getEnterPrise();
      }

      if(param['eid']){
        this.filterForm.patchValue({enterprise: param['eid']});
        this.onSubmit('other');
      }
    });
  }

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

  getEnterpriseGroupData() {
    let params = {
      page: 1,
      page_size: 1000
    }
    // this.http.getData(Api.enterpriseGroup.getAddDelete, params).subscribe(response => {
    //   if (response && response.status == 200) {
    //     this.enterPriseGroupList = response.data.rows.map((grp: any) => {
    //       return { item_id: grp.id, item_text: grp.enterprise_group_name }
    //     });
    //   }
    // })
  }

  getEnterPrise() {
    this.filterForm.patchValue({enterprise: null});
    let params = {
      page: 1,
      page_size: 1000,
      enterprise_group: this.filterFrm.enterprise_group.value
    }
    // this.http.getData(Api.enterprise.getAddDelete, params).subscribe(response => {
    //   if (response && response.status == 200) {
    //     this.enterPriseList = response.data.rows.map((enp: any) => {
    //       return { item_id: enp.id, item_text: enp.enterprise_name}
    //     });
    //   }
    // })
  }

  createFilterForm() {
    this.filterForm = this.formBuilder.group({
      enterprise_group: ['',],
      enterprise:[''],
      start_date: [''],
      end_date: [''],
      search: [''],
      sort_by: ['']
    });
  }

  get filterFrm() { return this.filterForm.controls; }

  cancelForm() {
    this.filterForm.reset();
    this.clearFilter.emit(true);
    this.createFilterForm()
    this.resetDatePicker();
  }

  onSubmit(option: string) {
    const payload = { ...this.filterForm.value };
    if(option === 'date'){
      if (!payload.start_date || !payload.enterprise_group ) {
        this.message.toast('warning', 'Please select value');
        return;
      }
    }
    else if(option === 'sort'){
      if (!payload.sort_by) {
        this.message.toast('warning', 'Please select value');
        return;
      }
    }
    if (!payload.enterprise && !payload.enterprise_group && !payload.start_date && !payload.end_date && !payload.search && !payload.sort_by) {
      this.message.toast('warning', 'Please select value');
      return;
    }
    if (payload.start_date || payload.end_date) {
      payload.date = this.formatDate(payload.start_date) + ',' + this.formatDate(payload.end_date)
    }
    if (!this.enableEnterprise) { delete payload.enterprise }
    if (!this.enableEnterpriseGroup) { delete payload.enterprise_group }
    if (!payload.search) { delete payload.search }
    if (!payload.sort_by) { delete payload.sort_by }
    delete payload.start_date;
    delete payload.end_date;
    this.filterOutputs.emit(payload);

  }

  onSearch() {
    // if(!this.searchField.trim().length) return;

    const payload = {
      search: this.searchField
    }
    this.filterOutputs.emit(payload);
  }

  resetDatePicker() {
    new Litepicker({
      element: document.getElementById('datepicker') as HTMLInputElement,
      singleMode: false,
      tooltipText: {
        one: 'day',
        other: 'days'
      },
      format: 'DD/MM/YY',
      setup: (picker) => {
        picker.on('clear:selection', () => {
        })
      }
    });
  }


  
}
