import {UserStatusType} from "../mocks/users.mock";

export interface UsersInterface{
  categoryName ?: string;
  icon?:string;
  status:UserStatusType;
  name:string;
  activity?:string;
  bg:string;
}
