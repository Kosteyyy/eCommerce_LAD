import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/index.js";
import { Provider } from "react-redux";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import GlobylStyles from "./components/styles/Global.js";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Store from "./components/Store/Store.jsx";
import ProductList from "./components/ProductList/ProductList.jsx";

const initialUser = {
  isLoggedIn: false,
  currenUserId: null,
  currentUserName: null,
  currentUserRole: null,
};

const App = () => {
  return (
    <Provider store={store}>
      <GlobylStyles />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="login" exact element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="store" element={<Store />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
