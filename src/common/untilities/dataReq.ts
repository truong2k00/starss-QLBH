const reqProduct = ref<IProductServicesReq>({
  accountID: 0,
  product_Name: "",
  productDescription: "",
  categoryID: 0,
  isNew: false,
  sale: false,
  quantity: 0,
  price: 0,
  priceSale: 0,
});

const dataRequest = (query: any) => {
  (reqProduct.value.accountID = query.accountID),
    (reqProduct.value.product_Name = query.product_Name),
    (reqProduct.value.productDescription = query.productDescription),
    (reqProduct.value.categoryID = query.categoryID),
    (reqProduct.value.isNew = query.isNew),
    (reqProduct.value.sale = query.sale),
    (reqProduct.value.quantity = query.quantity),
    (reqProduct.value.price = query.price),
    (reqProduct.value.priceSale = query.priceSale);
  return reqProduct.value;
};

const reqdata = {
  dataRequest,
};
export default reqdata;
