import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";
import { OrderService, ProductService } from "../../Service.js";
import { FaHistory, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Order from "../Order/Order.jsx";
import { Container } from "../styles/Container.styled";
import { Button } from "../styles/Button.styled";

const Dashboard = () => {
  let currentUser = useSelector((state) => state.user);
  let products = useSelector((state) => state.products).data;
  let ordersState = useSelector((state) => state.orders).data;
  const navigate = useNavigate();

  const [showOrderDeletedAlert, setShowOrderDeletedAlert] = useState(false);
  const [showOrderPlacedAlert, setShowOrderPlacedAlert] = useState(false);

  let [orders, setOrders] = useState([]);
  //   let categories = useSelector((state) => state.categories);
  let dispatch = useDispatch();

  //При загрузке страницы изменяем заголовок
  useEffect(() => {
    if (!currentUser.isLoggedIn) navigate("/login");
    document.title = "Личный кабинет - eCommerce";
  }, []);

  // Создаем функцию загрузки данных из базы тольк при смене пользователя, ане при каждом рендеринге
  let loadDataFromDatabase = useCallback(() => {
    dispatch(actions.fetchOrders(currentUser.currentUserId));
    dispatch(actions.fetchProducts());
  }, [currentUser.currentUserId]);

  // Загружаем данные из базы - заказы и товары
  useEffect(() => {
    loadDataFromDatabase();
  }, [currentUser.currentUserId]);

  // Создаем список заказов пользователя, прикрепляя в заказы вместо id товара товар, для его отображения в заказах
  useEffect(() => {
    if (products.length === 0 || ordersState.length === 0) return;
    let ordersWithProduct = [...ordersState];
    ordersWithProduct.forEach((ord) => {
      ord.product = ProductService.getProductByProductId(
        products,
        ord.productId
      );
    });
    setOrders(ordersWithProduct);
  }, [ordersState, products]);

  let onBuyNowClick = useCallback(
    (order_Id, orderId, userId, productId, quantity) => {
      if (window.confirm("Вы действительно хотите сделать заказ?")) {
        let updateOrder = {
          _id: order_Id,
          id: orderId,
          productId: productId,
          userId: userId,
          quantity: quantity,
          isPaymentCompleted: true,
        };

        dispatch(actions.editOrder(order_Id, updateOrder));
        loadDataFromDatabase();
        setShowOrderPlacedAlert(true);
      }
    },
    [loadDataFromDatabase]
  );

  let onDeleteClick = useCallback(
    (order_Id) => {
      if (window.confirm("Вы действительно хотите удалить данный заказ?")) {
        dispatch(actions.deleteOrder(order_Id));
        loadDataFromDatabase();
        setShowOrderDeletedAlert(true);
      }
    },
    [loadDataFromDatabase]
  );

  return (
    <Container>
      <Header>
        <h4>Личный кабинет </h4>
        <Button onClick={loadDataFromDatabase}>Обновить</Button>
      </Header>
      <FlexContainer>
        <Block>
          {/* prev orders */}
          <BlockHeader>
            <FaHistory /> Прошлые заказы
            <span>{OrderService.getPreviousOrders(orders).length}</span>
          </BlockHeader>
          {OrderService.getPreviousOrders(orders).length === 0 ? (
            <h4>Заказов нет</h4>
          ) : (
            ""
          )}
          {OrderService.getPreviousOrders(orders).map((ord) => (
            <Order
              key={ord.id}
              order_Id={ord._id}
              orderId={ord.id}
              productId={ord.productId}
              userId={ord.userId}
              isPaymentCompleted={ord.isPaymentCompleted}
              quantity={ord.quantity}
              productName={ord.product.productName}
              price={ord.product.price}
              onBuyNowClick={onBuyNowClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </Block>

        {/* cart */}
        <Block>
          <BlockHeader>
            <FaShoppingCart /> Корзина
            <span>{OrderService.getCart(orders).length}</span>
          </BlockHeader>

          {showOrderPlacedAlert ? (
            <Alert>
              Ваш заказ успешно оформлен.
              <span
                onClick={() => {
                  setShowOrderPlacedAlert(false);
                }}
              >
                &times;
              </span>
            </Alert>
          ) : (
            ""
          )}
          {showOrderDeletedAlert ? (
            <Alert>
              Ваш заказ удалён из корзины.{" "}
              <span
                onClick={() => {
                  setShowOrderDeletedAlert(false);
                }}
              >
                &times;
              </span>
            </Alert>
          ) : (
            ""
          )}

          {OrderService.getCart(orders).length === 0 ? (
            <h4>В корзине нет товаров</h4>
          ) : (
            ""
          )}
          {OrderService.getCart(orders).map((ord) => (
            <Order
              key={ord.id}
              order_Id={ord._id}
              orderId={ord.id}
              productId={ord.productId}
              userId={ord.userId}
              isPaymentCompleted={ord.isPaymentCompleted}
              quantity={ord.quantity}
              productName={ord.product.productName || ""}
              price={ord.product.price || ""}
              onBuyNowClick={onBuyNowClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </Block>
      </FlexContainer>
    </Container>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
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

const Block = styled.div`
  width: 50%;
  padding: 10px;
  @media (max-width: 1080px) {
    width: 100%;
  }
`;

const BlockHeader = styled.div`
  width: 100%;
  font-size: 24px;
  color: #369;
  padding: 10px;
  border-bottom: 2px solid #369;

  span {
    color: white;
    background-color: #369;
    border-radius: 3px;
    font-weight: 500;
    padding: 5px;
    margin: 0 10px;
  }
`;

const Alert = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fcf;
  padding: 20px 10px;
  margin: 20px 0px;
  align-items: center;
  span {
    float: right;
    cursor: pointer;
    font-size: 24px;
  }
`;

export default Dashboard;
