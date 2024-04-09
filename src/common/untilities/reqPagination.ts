const reqPaginations = (pageSize: any, pageNo: any, searchText: string) => {
  const reqPagination = {
    pageSize: pageSize,
    pageNo: pageNo,
    keyWord: searchText,
  };
  return reqPagination;
};

export default reqPaginations;
