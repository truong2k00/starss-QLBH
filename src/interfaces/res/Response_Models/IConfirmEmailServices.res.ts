export interface IConfirmEmailServicesRes {
  codeiVerification: string
  expired: Date
  isConfirmed: boolean
  userName: string
  mailSettingID: number
}
