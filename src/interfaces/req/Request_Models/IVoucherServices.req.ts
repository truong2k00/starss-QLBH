export interface IVoucherServicesReq {
  voucherName: string
  expirationDate: Date
  quantity: number
  reductedValue: number
  accountID: number
}
