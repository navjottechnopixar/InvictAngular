import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTextOnly]'
})
export class TextOnlyDirective {

  constructor(private _el: ElementRef) { }
  @HostListener('keydown', ['$event']) onValueInput(event: any) {
    console.log(event.keyCode);
  // if ((event.keyCode > 64 && event.keyCode < 91) || (event.keyCode > 96 && event.keyCode < 123) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 32){
  //   return true;
  // }
  //return event.preventDefault();
}
}
