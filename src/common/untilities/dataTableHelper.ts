const initTableConfig = (headers: tableHeader[]) => {
  return {
    headers: headers,
    data: [],
    pagination: {
      pageNo: 1,
      pageSize: 5,
      pageSizeOptions: [10, 20, 50, 100],
      totalPages: 1,
      totalItems: 1,
    },
  };
};

const updatePagination = (tableConfig: any, data: any, pagination: any) => {
  tableConfig.data = data;
  tableConfig.pagination = {
    ...pagination,
    pageSizeOptions: [10, 20, 50, 100],
  };
  return tableConfig;
};

const DataTableHelper = {
  initTableConfig,
  updatePagination,
};

export default DataTableHelper;
