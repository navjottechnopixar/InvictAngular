import { Injectable } from '@angular/core';
import Swal, { SweetAlertType, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PagnationService {

  constructor() { }

  /******************* toast messages ********************/
  toast(toastType: SweetAlertType, toastTitle: string) {
    const toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      showCloseButton: true,
      timer: 6000,
      animation: false,
      customClass: 'uk-animation-slide-right-small'
    });
    toast.fire({
      type: toastType,
      title: toastTitle
    });
  }

  /******************* confirmation dialog box ********************/
  async confirm(title: string, toastText?: string): Promise<SweetAlertResult> {
    const result: SweetAlertResult = await Swal.fire({
      title: `Are you sure you want to ${title}?`,
      text: toastText,
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#009688',
      cancelButtonColor: '#688696',
      confirmButtonText: 'Yes',
      animation: false,
      allowOutsideClick: false,
      customClass: 'uk-animation-slide-top-small'
    });
    return result;
  }

  /******************* alert dialog box with button ********************/
  alert(toastType: SweetAlertType, toastTitle: string, toastText?: string) {
    Swal.fire({
      type: toastType,
      title: toastTitle,
      animation: false,
      text: toastText,
      confirmButtonColor: '#28bebd',
      customClass: 'uk-animation-slide-top-small'
    });
  }

}
