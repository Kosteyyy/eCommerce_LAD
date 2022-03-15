import React from "react";
import styled from "styled-components";
import { FaArrowRight, FaTrash } from "react-icons/fa";
import { Button } from "../styles/Button.styled";

const Order = (props) => {
  // console.log("Order rendered", props);
  return (
    <Card>
      <h4>
        <FaArrowRight /> {props.productName}
        {props.isPaymentCompleted === false ? (
          <ButtonGroup>
            <Button
              color="white"
              bg="green"
              onClick={() => {
                props.onBuyNowClick(
                  props.order_Id,
                  props.orderId,
                  props.userId,
                  props.productId,
                  props.quantity
                );
              }}
            >
              Купить
            </Button>
            <Button
              bg="red"
              color="white"
              onClick={() => {
                props.onDeleteClick(props.order_Id);
              }}
            >
              <FaTrash /> Удалить
            </Button>
          </ButtonGroup>
        ) : (
          ""
        )}
      </h4>

      <table>
        <tbody>
          <tr>
            <td style={{ width: "100px" }}>Количество</td>
            <td>{props.quantity}</td>
          </tr>
          <tr>
            <td style={{ width: "100px" }}>Цена</td>
            <td>{props.price} р.</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  h4 {
    font-size: 20px;
    padding-bottom: 10px;
  }
  td,
  th {
    padding: 10px;
  }
`;
const ButtonGroup = styled.div`
  float: right;
  display: flex;
  @media (max-width: 1080px) {
    flex-direction: column;
  }
  button {
    margin: 5px;
  }
`;
export default Order;
