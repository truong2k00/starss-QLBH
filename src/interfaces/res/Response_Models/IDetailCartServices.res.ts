import { IProductServicesRes } from './IProductServices.res'

export interface IDetailCartServicesRes {
  accountID: number
  productID: number
  quantity: number
  cartID: string
  price: string
  totalPrice: string
  dataResponseProduct: IProductServicesRes
}
