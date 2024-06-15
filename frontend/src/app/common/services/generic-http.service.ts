import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpService {
  api: string = 'http://localhost:8000/api';

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService
  ) {}

  get<T>(api: string, callBack: (res: T) => void) {
    this._http.get<T>(`${this.api}/${api}`).subscribe({
      next: (res: T) => callBack(res),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._toastr.error(err.error.message)
      },
    });
  }

  post<T>(api: string, model: T, callBack: (res: T) => void) {
    this._http.post<T>(`${this.api}/${api}`, model, {}).subscribe({
      next: (res: T) => callBack(res),
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this._toastr.error(err.error.message)
      },
    });
  }
}
