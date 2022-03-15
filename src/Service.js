export const OrderService = {
  getPreviousOrders: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === true);
  },

  getCart: (orders) => {
    return orders.filter((order) => order.isPaymentCompleted === false);
  },
};

export const ProductService = {
  getProductByProductId: (products, productId) => {
    return products.find((prod) => prod.id === productId);
  },
};

export const BrandService = {
  getBrandByBrandId: (brands, brandId) => {
    return brands.find((brand) => brand.id === brandId);
  },
};

export const CategoryService = {
  getCategoryByCategoryId: (categories, categoryId) => {
    return categories.find((category) => category.id === categoryId);
  },
};

export const SortService = {
  getSortedArray: (elements, sortBy, sortOrder) => {
    if (!elements) return elements;

    let array = [...elements];
    array.sort((a, b) => {
      if (a[sortBy] && b[sortBy]) {
        return (
          a[sortBy].toString().toLowerCase() -
          b[sortBy].toString().toLowerCase()
        );
      } else return 0;
    });
    if (sortOrder === "DESC") array.reverse();
    return array;
  },
};
