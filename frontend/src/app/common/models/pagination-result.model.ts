export class PaginationResultModel<T>{
    datas: T;
    pageNmber: number = 1;
    pageSize: number = 1;
    isFirstPage: boolean = true;
    isLastPAge: boolean = false;
    totalPageCount: number = 0;
}