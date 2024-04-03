import IBasePaginationQueryParams from "@/interfaces/IBasePaginationQueryParams";

interface ISanPhamQueryParams extends IBasePaginationQueryParams {
  searchText: string;
  categoryIds: number[];
  status?: Boolean;
}

export default ISanPhamQueryParams;
