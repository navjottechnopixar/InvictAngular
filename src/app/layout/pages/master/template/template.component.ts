import { Component, OnInit } from '@angular/core';
import { Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { TableOfContents } from 'src/app/shared/models/TableOfContents';
import { Api } from 'src/app/utils/apis';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  tempList: any = [];
  constructor(
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.getTemplateList();
  }

  getTemplateList() {
    this.http.getData(Api.Master.templateList.getList, {}).subscribe(response => {
      if (response && response.status == 200) {
        debugger;
        this.tempList = (response.data && response.data.length) ? response.data : [];
        console.log(this.tempList);
      }
    })
  }

  addTemplate(){
    this.router.navigate(['master/template-list/add-template']);
  }
}
