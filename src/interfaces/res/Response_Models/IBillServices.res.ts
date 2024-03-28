import { IInvoiceDetailServicesRes } from './IInvoiceDetailServices.res'

export interface IBillServicesRes {
  billId: number
  date_Create: Date
  statusBillID: number
  accountID: number
  totalPrice: number
  addressReceiveID: number
  invoiceDetail: [IInvoiceDetailServicesRes]
}
