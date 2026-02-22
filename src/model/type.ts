import { Item } from './../app/page/dashboard/item/item';
export interface CustomerModel {
  id: String;
  title: String;
  name: string;
  dob: object;
  salary: number;
  address: string;
  city: string;
  province: string;
  postalCode: string;
}
export interface ItemModel {
  code: String;
  description: String;
  packSize: string;
  unitPrice: number;
  qtyOnHand: number;
 
}