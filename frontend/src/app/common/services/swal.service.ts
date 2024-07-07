import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class SwalService {


  constructor() { }

  callSwal(text: string, title: string, btnName: string, callBack: () => void){
    Swal.fire({
      text :"",
      title:"",
      showConfirmButton: true,
      confirmButtonText: "",
      cancelButtonText: "Cancel",
      icon: "question"
    }).then(res => {
      if(res.isConfirmed){
          callBack();
      }
    })
  }


}
