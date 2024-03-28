import { emailcode } from '@/common/enum/emailcode'

export interface IMailSettingServicesRes {
  code: emailcode
  tieuDe: string
  noiDung: string
  title: string
  description: string
}
