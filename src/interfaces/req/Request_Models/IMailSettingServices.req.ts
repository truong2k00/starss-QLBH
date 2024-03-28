import { emailcode } from '@/common/enum/emailcode'

export interface IMailSettingServicesReq {
  code: emailcode
  tieuDe: string
  noiDung: string
  title: string
  description: string
}
