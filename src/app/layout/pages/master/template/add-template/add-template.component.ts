import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { TableOfContents } from 'src/app/shared/models/TableOfContents';
import { Api } from 'src/app/utils/apis';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {
  mcqList: any;
  templateData: any;
  templateData1: any;
  templateCreatedJson: any;
  previousId: any;
  tb: TableOfContents[] = [];
  uniqueId: number = 2;
  res: any;
  personalForm: any;
  updateMCQList: any;

  constructor(private renderer: Renderer2,
    private http: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,) {
    // start
    // this.templateData1 = {
    //   "templateName": "testtemplate",
    //   "templateDescription": "desc",
    // this.tb = [
    //   {
    //     "Name": "Section 1",
    //     "Desc": [
    //       {
    //         "Name": "Section1.A",
    //         "Desc": [
    //           {
    //             "Name": "Section1.A.1",
    //             "Desc": [
    //               {
    //                 "Name": "Question 1",
    //                 "Desc": [
    //                   {
    //                     "Name": "Option1",
    //                     "Desc": [

    //                     ],
    //                     "Type": "Option",
    //                     "Level": "4"
    //                   },
    //                   {
    //                     "Name": "Option2",
    //                     "Desc": [

    //                     ],
    //                     "Type": "Option",
    //                     "Level": "4"
    //                   }
    //                   ,
    //                   {
    //                     "Name": "Option3",
    //                     "Desc": [

    //                     ],
    //                     "Type": "Option",
    //                     "Level": "4"
    //                   },
    //                   {
    //                     "Name": "Option4",
    //                     "Desc": [

    //                     ],
    //                     "Type": "Option",
    //                     "Level": "4"
    //                   }
    //                 ],
    //                 "Type": "Question",
    //                 "Level": "4"
    //               },
    //               {
    //                 "Name": "Question 2",
    //                 "Desc": [


    //                 ],
    //                 "Type": "Question",
    //                 "Level": "4"
    //               }
    //             ],
    //             "Type": "Section",
    //             "Level": "3"
    //           },
    //           {
    //             "Name": "Section1.A.2",
    //             "Desc": [


    //             ],
    //             "Type": "Section",
    //             "Level": "3"
    //           }
    //         ],
    //         "Type": "Section",
    //         "Level": "2"
    //       },
    //       {
    //         "Name": "Section1.B",
    //         "Desc": [


    //         ],
    //         "Type": "Section",
    //         "Level": "2"
    //       }
    //     ],
    //     "Type": "Section",
    //     "Level": "1"
    //   },
    //   {
    //     "Name": "Section 2",
    //     "Desc": [
    //     ],
    //     "Type": "Section",
    //     "Level": "1"
    //   }
    // ]
    // };
    // end

    this.personalForm = this.formBuilder.group({
      optionName: [''],
      optionScore: [''],
    });
  }

  ngOnInit(): void {
    // this.renderer.createElement('div');
    this.tb = [
      {
        "Id": 1,
        "Name": "Add section title",
        "Desc": [
          {
            "Id": 2,
            "Name": "Add a Question",
            "Desc": [],
            "Type": "Question",
            "Level": "2"
          }
        ],
        "Type": "Section",
        "Level": "1"
      }
    ]

   this.getMCQList();
  }

  getMCQList() {
    this.http.getData(Api.Master.templateList.getDefaultMcqList, {}).subscribe(response => {
      if (response && response.status == 200) {
        debugger;
        this.mcqList = (response.data.getMcqmasterViewModel && response.data.getMcqmasterViewModel.length) ? response.data : [];

      }
    })
  }

  myFunction() {
   var doc = document.getElementById("myDropdown1")
   if(doc != null)
   doc.classList.toggle("show");
  }
  // add main question
  addMainQuestion() {
    this.tb.push({ Id: (this.uniqueId + 1), Name: "Add a Question", Desc: [], Type: "Question", Level: "1" });
    this.uniqueId = this.uniqueId + 1;
    console.log(this.tb);
  }

  // add main section
  addMainSection() {
    this.tb.push({ Id: (this.uniqueId + 1), Name: "Add section title", Desc: [{ Id: (this.uniqueId + 2), Name: "Add a Question", Desc: [], Type: "Question", Level: "2" }], Type: "Section", Level: "1" });
    this.uniqueId = this.uniqueId + 2;
    console.log(this.tb);
  }

  addSubQuestion(id: any, level: any) {
    if (this.tb.length > 0) {
      if (level == 1) {
        let obj: any;
        obj = this.tb.find((i: any) => i.Id == id);
        obj.Desc.push({ Id: this.uniqueId + 1, Name: "Add a Question", Desc: [], Type: "Question", Level: (parseInt(level, 10) + 1).toString() })
      } else {
        this.getObject(this.tb, id, level);
      }
      this.uniqueId = this.uniqueId + 1;
    }
  }

  addSubSection(id: any, level: any) {
    if (this.tb.length > 0) {
      if (level == 1) {
        let obj: any;
        obj = this.tb.find((i: any) => i.Id == id);
        obj.Desc.push({ Id: this.uniqueId + 1, Name: "Add section title", Desc: [{ Id: (this.uniqueId + 2), Name: "Add a Question", Desc: [], Type: "Question", Level: (parseInt(level, 10) + 2).toString() }], Type: "Section", Level: (parseInt(level, 10) + 1).toString() })
      } else {
        this.getObject(this.tb, id, level);
      }
      this.uniqueId = this.uniqueId + 2;
    }
    console.log(JSON.stringify(this.tb));
  }

  getObject(theObject: any, Id: any, level: any) {
    var result = null;
    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        result = this.getObject(theObject[i], Id, level);
        if (result != null || undefined) {
          break;
        }
      }
    }
    else {
      for (var prop in theObject) {
        console.log(prop + ': ' + theObject[prop]);
        if (prop == 'Id') {
          if (theObject[prop] == Id) {
            if (theObject.Type == 'Section') {
              theObject.Desc.push({ Id: this.uniqueId + 1, Name: "Add a section title", Desc: [{ Id: (this.uniqueId + 2), Name: "Add a Question", Desc: [], Type: "Question", Level: (parseInt(level, 10) + 2).toString() }], Type: "Section", Level: (parseInt(level, 10) + 1).toString() });
            }
            if (theObject.Type == 'Question') {
              theObject.Desc.push({ Id: this.uniqueId + 1, Name: "Add a Question", Desc: [], Type: "Question", Level: (parseInt(level, 10) + 1).toString() })
            }
          }
        }
        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
          result = this.getObject(theObject[prop], Id, level);
          if (result != null || undefined) {
            break;
          }
        }
      }
    }
    return;
  }

  deleteSection() {

  }

  showSideOptions(Id: any) {
    var doc = document.getElementById(Id);
    var prevDoc = document.getElementById(this.previousId);
    if (doc != undefined) {
      doc.style.display = 'block';
    }
    if (Id != this.previousId) {
      if (prevDoc != undefined) {
        prevDoc.style.display = 'none';
      }
    }
    this.previousId = Id;
  }

  deleteKey(id: any, level: any) {
    console.log(this.findUIDObj(id, this.tb));
    // if (arr) {
    //     arr.splice(idx, 1); // Remove object from its parent array
    // }
  }

  findUIDObj(uid: any, arr: any) {
    if (!arr) return;
    let idx = arr.findIndex((obj: any) => obj.Id === uid);
    if (idx > -1) {
      console.log([arr, idx])
        if (arr) {
        arr.splice(idx, 1); // Remove object from its parent array
        }
    };
    for (const obj of arr) {
      var result = this.findUIDObj(uid, obj.Desc);
      if (result != null) {
        console.log(result);
      }
    }
  };

  saveTemplate() {
    let json = JSON.stringify(this.tb);
    this.http.postData(`${Api.Master.templateList.createTemplate}?templateRequestJson=${json}`, {})
      .subscribe(response => {
        if (response && response.status == 200) {
          // if(response.success){
          //   this.message.toast('success', `Status updated successfully`);
          // }
          // else{
          //   this.message.toast('error', response.message);
          // }
        }
      })
  }

  goBack() {
    this.router.navigate(['/master/template-list']);
  }

  goNext() {
    this.router.navigate(['/master/template-list/form-setting']);
  }

  getMcqValue(q: any){
    console.log(q);
    this.updateMCQList = q;
    console.log(this.updateMCQList);
  }

}
