import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BrandService,
  CategoryService,
  OrderService,
  ProductService,
} from "../../Service.js";
import Product from "../Product/Product.jsx";
import { Container } from "../styles/Container.styled";

const Store = () => {
  let currentUser = useSelector((state) => state.user);
  let products = useSelector((state) => state.products).data;
  let brandsState = useSelector((state) => state.brands).data;
  let categoriesState = useSelector((state) => state.categories).data;
  const navigate = useNavigate();

  //изменённые данные в соответствии с представлением компонента, фильтром и тд
  let [brands, setBrands] = useState([]);
  let [categories, setCategories] = useState([]);
  let [productsState, setProductsState] = useState([]);
  let [productsToShow, setProductsToShow] = useState([]);

  let dispatch = useDispatch();

  // Создаем функцию загрузки данных из базы тольк при смене пользователя, ане при каждом рендеринге
  let loadDataFromDatabase = useCallback(() => {
    dispatch(actions.fetchOrders(currentUser.currentUserId));
    dispatch(actions.fetchProducts());
    dispatch(actions.fetchBrands());
    dispatch(actions.fetchCategories());
  }, [currentUser.currentUserId]);

  // Загружаем данные из базы. Поскольку товары и заказы уже загружены при авторизации и переходе через личный кабинет,
  //   То при создании компонента загружаем только бренды и категории.
  useEffect(() => {
    if (!currentUser.isLoggedIn) navigate("/login");
    dispatch(actions.fetchBrands());
    dispatch(actions.fetchCategories());
    document.title = "Товары - eCommerce";
  }, []);
  // добавляем в текущие массивы брэндов и категорий поля метки checked
  useEffect(() => {
    if (categoriesState.length === 0) return;
    setCategories(
      categoriesState.map((cat) => {
        return { ...cat, isChecked: true };
      })
    );
  }, [categoriesState]);

  useEffect(() => {
    if (brandsState.length === 0) return;
    setBrands(
      brandsState.map((brand) => {
        return { ...brand, isChecked: true };
      })
    );
  }, [brandsState]);

  useEffect(() => {
    if (
      brandsState.length === 0 ||
      categoriesState.length === 0 ||
      products.length === 0
    )
      return;
    let prods = [...products];
    prods.forEach((product) => {
      //установка Свойства Брэнд и Категория
      product.brand = BrandService.getBrandByBrandId(
        brandsState,
        product.brandId
      );
      product.category = CategoryService.getCategoryByCategoryId(
        categoriesState,
        product.categoryId
      );
      product.isOrdered = false;
    });
    setProductsState(prods);
    setProductsToShow(prods);
  }, [brandsState, categoriesState, products]);

  //updateBrandIsChecked
  let updateBrandIsChecked = (id) => {
    let brandsData = brands.map((brand) => {
      if (brand.id === id) brand.isChecked = !brand.isChecked;
      return brand;
    });
    setBrands(brandsData);
    updateProductsToShow();
  };

  //updateCategoryIsChecked
  let updateCategoryIsChecked = (id) => {
    let categoriesData = categories.map((category) => {
      if (category.id === id) category.isChecked = !category.isChecked;
      return category;
    });
    setCategories(categoriesData);
    updateProductsToShow();
  };

  //updateProductsToShow
  let updateProductsToShow = () => {
    // console.log(
    //   "filtered: ",
    //   productsState.filter((prod) => {
    //     return categories.filter(
    //       (cat) => cat.id === prod.categoryId && cat.isChecked
    //     );
    //   })
    // );
    setProductsToShow(
      productsState
        .filter((prod) => {
          return (
            categories.filter(
              (category) =>
                category.id === prod.categoryId && category.isChecked
            ).length > 0
          );
        })
        .filter((prod) => {
          return (
            brands.filter(
              (brand) => brand.id === prod.brandId && brand.isChecked
            ).length > 0
          );
        })
    );
  };

  //When click Add to Cart button

  let onAddToCartClick = (prod) => {
    let newOrder = {
      id: uuidv4(),
      userId: currentUser.currentUserId,
      productId: prod.id,
      quantity: 1,
      isPaymentCompleted: false,
    };
    dispatch(actions.createOrder(newOrder));
    // Используем функцию аргументом в useState чтобы получить предыдущее состояние
    setProductsState((prodState) => {
      let allProducts = prodState.map((p) => {
        if (p.id === prod.id) {
          p.isOrdered = true;
        }
        return p;
      });

      return allProducts;
    });
    updateProductsToShow();
  };

  return (
    <Container>
      <Header>
        <h4>Товары</h4>
      </Header>
      <FlexContainer>
        <SideBar>
          <h4>Брэнды</h4>
          <ul>
            {brands.map((brand) => {
              return (
                <li key={brand.id}>
                  <input
                    type="checkbox"
                    value="true"
                    checked={brand.isChecked}
                    onChange={() => {
                      updateBrandIsChecked(brand.id);
                    }}
                    id={`brand${brand.id}`}
                  />
                  <label htmlFor={`brand${brand.id}`}>{brand.brandName}</label>
                </li>
              );
            })}
          </ul>
          <h4>Категории</h4>
          <ul>
            {categories.map((cat) => {
              return (
                <li key={cat.id}>
                  <input
                    type="checkbox"
                    value="true"
                    checked={cat.isChecked}
                    onChange={() => {
                      updateCategoryIsChecked(cat.id);
                    }}
                    id={`cat${cat.id}`}
                  />
                  <label htmlFor={`cat${cat.id}`}>{cat.categoryName}</label>
                </li>
              );
            })}
          </ul>
        </SideBar>
        <Products>
          <h4>Товары</h4>
          <FlexContainer>
            {productsToShow.map((prod) => (
              <Product
                key={prod.id}
                product={prod}
                onAddToCartClick={onAddToCartClick}
              />
            ))}
          </FlexContainer>
        </Products>
      </FlexContainer>
    </Container>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  flex-wrap: wrap;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #ddd;
  h4 {
    font-size: 24px;
    font-weight: 500;
  }
`;

const SideBar = styled.div`
  width: 20%;
  max-width: 400px;
  border-right: 1px solid #ddd;
  li {
    list-style-type: none;
    margin: 10px 0px;
  }
  label {
    padding: 10px;
  }
  @media (max-width: 1080px) {
    width: 100%;
    border: none;
  }
`;
const Products = styled.div`
  padding: 0px 20px;
  width: 70%;
  flex-grow: 1;
  @media (max-width: 1080px) {
    width: 100%;
    padding: 20px 0px;
  }
`;

export default Store;
