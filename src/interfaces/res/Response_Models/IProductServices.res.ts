import { IImageProductServicesRes } from './IImageProductServices.Res'

export interface IProductServicesRes {
  accountID: number
  product_Name: string
  productDescription: string
  categoryID: number
  isNew: boolean
  sale: boolean
  quantity: number
  price: number
  priceSale: number
  productID: number
  username: string
  metaProduct: string
  evaluate: number
  imageProduct: [IImageProductServicesRes]
}
