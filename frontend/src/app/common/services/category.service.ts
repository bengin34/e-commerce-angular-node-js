import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { CategoryModel } from '../../components/categories/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _http: GenericHttpService
  ) { }


  getAll(callBack: (res: CategoryModel[]) => void){
    this._http.get<CategoryModel[]>("categories", res => callBack(res))
  }

  add(name:string, callBack: (res : ))
}
