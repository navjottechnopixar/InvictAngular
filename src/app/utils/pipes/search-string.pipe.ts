import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchString'
})
export class SearchStringPipe implements PipeTransform {

  transform(parm:any,items: any, term: any): any {
    if (term === undefined) {
      return items;
    }
    if(parm){
      console.log(parm)
      return items.filter((item:any) =>
       
          item[parm] != null &&
          item[parm]
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
      
    );
    }else{
      return items.filter((item:any) =>
      
      Object.keys(item).some(
        k =>
          item[k] != null &&
          item[k]
            .toString()
            .toLowerCase()
            .includes(term.toLowerCase())
      )
    );
    }
    
  }
 
  

}
