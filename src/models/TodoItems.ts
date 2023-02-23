export interface TodoItems {
  id?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id?: number;
  userName: string;
  fullName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  family_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  first_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  item_name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  registration_date?: Date | undefined ;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expire_date: Date  ;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  finished_date: Date  ;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  is_deleted?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  create_date_time?: Date;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  update_date_time?: Date;
  priority?: number;
  user:UsersModel;
  }
  
  export interface UsersModel{
    id? : number;
    username: string;
    password:string;
    family_name:string;
    first_name:string;
    authority:string;
    is_deleted:boolean;
    create_date_time:Date;
    update_date_time:Date;
   }

