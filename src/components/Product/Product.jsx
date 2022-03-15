import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowRight, FaStar, FaCartPlus } from "react-icons/fa";
import { Button } from "../styles/Button.styled";

function Product({ product, onAddToCartClick = () => {} }) {
  return (
    <Card>
      <h5>
        <FaArrowRight /> {product.productName}
      </h5>
      {/* <div>
        isOrdered: {product.isOrdered.toString()} id: {product.id}
      </div> */}
      <div>Цена: {product.price.toFixed(2)} р.</div>
      <div>
        {" "}
        #{product.brand.brandName} #{product.category.categoryName}
      </div>
      <img src={product.img} width="200" height="200" />
      <div>
        {[...Array(product.rating).keys()].map((n) => {
          return <FaStar style={{ color: "gold" }} key={n} />;
        })}
        {[...Array(5 - product.rating).keys()].map((n) => {
          return <FaStar style={{ color: "gray" }} key={n} />;
        })}
      </div>

      <CardFooter>
        {product.isOrdered ? (
          <span>В корзине</span>
        ) : (
          <Button
            bg="#369"
            color="white"
            onClick={() => onAddToCartClick(product)}
          >
            <FaCartPlus />
            &nbsp;В корзину
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

const Card = styled.div`
  width: 40%;
  flex-grow: 1;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  h5 {
    font-size: 20px;
    padding-bottom: 10px;
  }
  div {
    margin: 10px 0px;
  }
  @media (max-width: 1080px) {
    width: 100%;
  }
`;
const CardFooter = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 20px;
  span {
    font-size: 20px;
  }
`;
export default Product;
