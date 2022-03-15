import * as actionTypes from "../constants/action-types.js";

//Orders reducer
let initialOrders = {
  data: [],
  loading: false,
  error: "",
};

export const ordersReducer = (state = initialOrders, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_REQUEST:
      return { data: [], loading: true, error: "" };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { data: action.payload, loading: false, error: "" };

    case actionTypes.FETCH_ORDERS_ERROR:
      return { data: state.data, loading: false, error: action.payload };

    //CREATE_ORDER
    case actionTypes.CREATE_ORDER_REQUEST:
      return { data: state.data, loading: true, error: "" };

    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        data: [...state.data, action.payload],
        loading: false,
        error: "",
      };

    case actionTypes.CREATE_ORDER_ERROR:
      return { data: state.data, loading: false, error: action.payload };

    //DELETE_ORDER
    case actionTypes.DELETE_ORDER_REQUEST:
      return { data: state.data, loading: true, error: "" };

    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        data: state.data.filter((task) => task.id !== action.payload),
        loading: false,
        error: "",
      };

    case actionTypes.DELETE_ORDER_ERROR:
      return { data: state.data, loading: false, error: action.payload };

    default:
      return state;
  }
};

//Productsreducer
let initialProducts = {
  data: [],
  loading: false,
  error: "",
};

export const productsReducer = (state = initialProducts, action) => {
  switch (action.type) {
    //FETCH PRODUCTS
    case actionTypes.FETCH_PRODUCTS_REQUEST:
      return { data: [], loading: true, error: "" };

    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return { data: action.payload, loading: false, error: "" };

    case actionTypes.FETCH_PRODUCTS_ERROR:
      return { data: state.data, loading: false, error: action.payload };

    default:
      return state;
  }
};

//Brands
let initialBrands = {
  data: [],
  loading: false,
  error: "",
};

export const brandsReducer = (state = initialBrands, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BRANDS_REQUEST:
      return { data: [], loading: true, error: "" };

    case actionTypes.FETCH_BRANDS_SUCCESS:
      return { data: action.payload, loading: false, error: "" };

    case actionTypes.FETCH_BRANDS_ERROR:
      return { data: state.data, loading: false, error: action.payload };

    default:
      return state;
  }
};

//Categories reducer
let initialCategories = {
  data: [],
  loading: false,
  error: "",
};

export const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORIES_REQUEST:
      return { data: [], loading: true, error: "" };

    case actionTypes.FETCH_CATEGORIES_SUCCESS:
      return { data: action.payload, loading: false, error: "" };

    case actionTypes.FETCH_CATEGORIES_ERROR:
      return { data: state.data, loading: false, error: action.payload };

    default:
      return state;
  }
};
