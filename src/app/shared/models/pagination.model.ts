export class PaginationParams {
  limit: number = 10;
  skip: number = 0;
}    

export class Paginate {
  count: number = 0;
  page: number = 0;
}
export class PaginateMilstone{
  page_size: number = 10;
  page: number = 1;
}
 
export class PaginationModel {
  currentPage: number = 1;
  pageSize: number = 10;
  count: number = 0;
}