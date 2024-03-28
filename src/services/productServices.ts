import axios from '@/plugins/axios'
import { isParameter } from 'typescript'
import { ca } from 'vuetify/locale'

const CONTROLLER_NAME = 'Product'
const CONTROLLER_DELETE = 'Delete'

const GetAll = async () => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetAll?sale=false`)
    console.log(res.data)
    return res.data
  } catch {
    return null
  }
}

const DeleteProduct = async () => {
  try {
    const res = await axios.delete(`${CONTROLLER_NAME}/` + CONTROLLER_DELETE)
  } catch {
    return null
  }
}

const Product = {
  GetAll,
  DeleteProduct,
}

export default Product
