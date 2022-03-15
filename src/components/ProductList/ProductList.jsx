import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import {
  BrandService,
  CategoryService,
  SortService,
  OrderService,
  ProductService,
} from "../../Service.js";
import { FaSuitcase, FaStar, FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Container } from "../styles/Container.styled";

const ProductList = () => {
  //Глобальные State из Redux
  let currentUser = useSelector((state) => state.user);
  let products = useSelector((state) => state.products).data;
  let brandsState = useSelector((state) => state.brands).data;
  let categoriesState = useSelector((state) => state.categories).data;

  let [selectedBrand, setSelectedBrand] = useState("");
  let [search, setSearch] = useState("");

  let [sortBy, setSortBy] = useState("productName"); //заголовок столбца по которому сортируем
  let [sortOrder, setSortOrder] = useState("ASC"); //ASC or DESC

  const [productsState, setProductsState] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]); //отсортированный дубликат товаров
  const navigate = useNavigate();
  let dispatch = useDispatch();

  let loadDataFromDatabase = useCallback(() => {
    dispatch(actions.fetchProducts());
    dispatch(actions.fetchBrands());
    dispatch(actions.fetchCategories());
  }, [currentUser.currentUserId]);

  // Загружаем исходные данные из базы при маунте компонента
  useEffect(() => {
    if (!currentUser.isLoggedIn || currentUser.currentUserRole != "admin")
      navigate("/login"); // Если не админ зашел на страницу - перенаправляем
    loadDataFromDatabase();
    document.title = "Панель товаров - eCommerce";
  }, []);

  useEffect(() => {
    if (
      //Если данные ещё не все загрузились с сервера то ждём пока догрузится последний из запросов
      brandsState.length === 0 ||
      categoriesState.length === 0 ||
      products.length === 0
    )
      return;
    let allProds = [...products];
    let prods = allProds.filter(
      (p) => p.productName.toLowerCase().indexOf(search.toLowerCase()) >= 0
    );
    prods.forEach((product) => {
      //установка Свойства Брэнд и Категория вместо ID
      product.brand = BrandService.getBrandByBrandId(
        brandsState,
        product.brandId
      );
      product.category = CategoryService.getCategoryByCategoryId(
        categoriesState,
        product.categoryId
      );
    });
    setProductsState(prods); //И устанавливаем в текущее состояние компонента
  }, [brandsState, categoriesState, products, search]);

  // устанавливаем столбец сортировкой при клике по заголовку, меняем порядок сортировки
  const onSortColumnNameClick = (event, columnName) => {
    event.preventDefault(); //Чтобы не обновлялась страница
    setSortBy(columnName);
    let negatedSortOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    setSortOrder(negatedSortOrder);
  };

  //Фильтр товаров по бренду
  let filteredProducts = useMemo(() => {
    return productsState.filter(
      (prod) => prod.brand.brandName.indexOf(selectedBrand) >= 0
    );
  }, [productsState, selectedBrand]);

  //useEffect: получаем сортированный массив, sortBy or sortOrder
  useEffect(() => {
    setSortedProducts(
      SortService.getSortedArray(filteredProducts, sortBy, sortOrder)
    );
  }, [filteredProducts, sortBy, sortOrder]);

  // Генерируем заголовок для столбца таблицы
  let getColumnHeader = (columnName, displayName) => {
    return (
      <>
        <a
          href="/#"
          onClick={(e) => {
            onSortColumnNameClick(e, columnName);
          }}
        >
          {displayName}
        </a>{" "}
        {sortBy === columnName && sortOrder === "ASC" ? <FaSortUp /> : ""}
        {sortBy === columnName && sortOrder === "DESC" ? <FaSortDown /> : ""}
      </>
    );
  };

  return (
    <Container>
      <Header>
        <h4>
          <FaSuitcase className="pb-1" /> Товары{" "}
          <span className="badge badge-dark">{products.length}</span>
        </h4>

        <select
          className="form-control"
          value={selectedBrand}
          onChange={(event) => setSelectedBrand(event.target.value)}
        >
          <option value="">Все производители</option>
          {brandsState.map((brand) => (
            <option value={brand.brandName} key={brand.id}>
              {brand.brandName}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search"
          className="form-control"
          autoFocus="autofocus"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Header>

      <Content>
        <table>
          <thead>
            <tr>
              <th>{getColumnHeader("productName", "Наименование")}</th>
              <th>{getColumnHeader("price", "Цена")}</th>
              <th>{getColumnHeader("brandName", "Производитель")}</th>
              <th>{getColumnHeader("categoryName", "Категория")}</th>
              <th>{getColumnHeader("rating", "Рейтинг")}</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((prod) => {
              return (
                <tr key={prod.id}>
                  <td>{prod.productName}</td>
                  <td>{prod.price}</td>
                  <td>{prod.brand.brandName}</td>
                  <td>{prod.category.categoryName}</td>
                  <td>
                    {" "}
                    <div>
                      {[...Array(prod.rating).keys()].map((n) => {
                        return <FaStar style={{ color: "gold" }} key={n} />;
                      })}
                      {[...Array(5 - prod.rating).keys()].map((n) => {
                        return <FaStar style={{ color: "gray" }} key={n} />;
                      })}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Content>
    </Container>
  );
};

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  background-color: #ddd;
  h4 {
    font-size: 24px;
    font-weight: 500;
  }
  select {
    background-color: white;
    font-size: 16px;
    padding: 5px;
    border: 1px solid #aaa;
    border-radius: 5px;
  }
  input {
    padding: 5px;
    font-size: 16px;
    width: 300px;
  }

  span {
    margin-left: 10px;
    background-color: #369;
    color: white;
    padding: 3px 10px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    input {
      width: 100%;
      margin-top: 10px;
    }
    select {
      width: 100%;
      margin-top: 10px;
    }
  } ;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 20px;
  justify-content: center;
  thead: {
    border-bottom: 2px solid #369;
  }
  td,
  th {
    padding: 10px 20px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
`;

export default ProductList;
