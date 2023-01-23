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
  registration_date?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expire_date?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  finished_date?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  is_deleted?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  create_date_time?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  update_date_time?: number;
  priority?: number;
}
