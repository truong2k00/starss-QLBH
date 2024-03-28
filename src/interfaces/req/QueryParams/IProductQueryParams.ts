import IBasePaginationQueryParams from '@/interfaces/IBasePaginationQueryParams'

interface ISanPhamQueryParams extends IBasePaginationQueryParams {
  searchText: string
  categoryIds: Number[]
  status?: Boolean
}

export default ISanPhamQueryParams
