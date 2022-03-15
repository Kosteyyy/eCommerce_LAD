import * as actionTypes from "../constants/action-types.js";
import { API_URL } from "../../server/db_access.js";
import axios from "axios";

//Orders

export const fetchOrders = (userId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.FETCH_ORDERS_REQUEST,
  });
  try {
    let response = await axios.get(`${API_URL}/orders?userId=${userId}`);
    dispatch({
      type: actionTypes.FETCH_ORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_ORDERS_ERROR,
      payload: err,
    });
  }
};

export const createOrder = (newOrder) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.CREATE_ORDER_REQUEST,
  });

  try {
    let response = await axios.post(`${API_URL}/orders`, newOrder);
    dispatch({
      type: actionTypes.CREATE_ORDER_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.CREATE_ORDER_ERROR,
      payload: err,
    });
  }
};

export const editOrder = (orderId, order) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.EDIT_ORDER_REQUEST,
  });

  try {
    let response = await axios.put(`${API_URL}/orders/${orderId}`, order);
    dispatch({
      type: actionTypes.EDIT_ORDER_SUCCESS,
      payload: orderId,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.EDIT_ORDER_ERROR,
      payload: err,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.DELETE_ORDER_REQUEST,
  });

  try {
    let response = await axios.delete(`${API_URL}/orders/${orderId}`);
    dispatch({
      type: actionTypes.DELETE_ORDER_SUCCESS,
      payload: orderId,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.DELETE_ORDER_ERROR,
      payload: err,
    });
  }
};

// Products

export const fetchProducts = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.FETCH_PRODUCTS_REQUEST,
  });
  try {
    let response = await axios.get(`${API_URL}/products`);
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_PRODUCTS_ERROR,
      payload: err,
    });
  }
};

// Brands

export const fetchBrands = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.FETCH_BRANDS_REQUEST,
  });
  try {
    let response = await axios.get(`${API_URL}/brands`);
    dispatch({
      type: actionTypes.FETCH_BRANDS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_BRANDS_ERROR,
      payload: err,
    });
  }
};

// Categories

export const fetchCategories = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.FETCH_CATEGORIES_REQUEST,
  });
  try {
    let response = await axios.get(`${API_URL}/categories`);
    dispatch({
      type: actionTypes.FETCH_CATEGORIES_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_CATEGORIES_ERROR,
      payload: err,
    });
  }
};
