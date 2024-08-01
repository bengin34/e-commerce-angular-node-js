import { Injectable } from '@angular/core';
import { GenericHttpService } from '../../../services/generic-http.service';
import { MessageResponseModel } from '../../../models/message.response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: GenericHttpService) {}

  add(model: FormData, callBack: (res: MessageResponseModel) => void) {
    this._http.post<MessageResponseModel>('products/add', model, (res) =>
      callBack(res)
    );
  }
}
