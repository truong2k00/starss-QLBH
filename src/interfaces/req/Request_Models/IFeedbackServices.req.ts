import { star } from '@/common/enum/stars'

export interface IFeedbackServicesReq {
  feedBack_Quality: string
  opinion: string
  star: star
  accountID: number
  productID: number
}
