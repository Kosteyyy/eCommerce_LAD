import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
import styled from "styled-components";
import { Button } from "../styles/Button.styled";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  //   when user clicks Logout button
  let onLogoutClick = (e) => {
    e.preventDefault();
    dispatch(actions.logout());
    navigate("/");
  };
  return (
    <>
      <Nav>
        <Logo href="/#">eCommerce</Logo>
        <Hamburger onClick={() => setIsOpen(!isOpen)}>
          <span />
          <span />
          <span />
        </Hamburger>
        <Menu isOpen={isOpen}>
          {!user.isLoggedIn ? (
            <MenuLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/"
            >
              Вход
            </MenuLink>
          ) : (
            ""
          )}

          {!user.isLoggedIn ? (
            <MenuLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="/register"
            >
              Регистрация
            </MenuLink>
          ) : (
            ""
          )}

          {user.isLoggedIn && user.currentUserRole === "user" ? (
            <MenuLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="dashboard"
            >
              Личный кабинет
            </MenuLink>
          ) : (
            ""
          )}

          {user.isLoggedIn && user.currentUserRole === "user" ? (
            <MenuLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="store"
            >
              Каталог
            </MenuLink>
          ) : (
            ""
          )}

          {user.isLoggedIn && user.currentUserRole === "admin" ? (
            <MenuLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to="products"
            >
              Товары
            </MenuLink>
          ) : (
            ""
          )}
        </Menu>
        {/* right box starts */}
        {user.isLoggedIn ? (
          <UserBox>
            <div>{user.currentUserName}</div>

            <Button bg="white" color="#369" onClick={onLogoutClick}>
              Выйти
            </Button>
          </UserBox>
        ) : (
          ""
        )}
      </Nav>
    </>
  );
}

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #369;
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  transition: max-height 0.3s ease-in};
  }
`;

const MenuLink = styled(NavLink)`
  padding: 3px;
  margin: 5px 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;

  color: white;
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #fff;
  }
  &:hover {
    color: #9cf;
  }
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;
`;

const UserBox = styled.div`
  float: right;
  color: white;
  display: flex;
  align-items: center;
  div {
    color: white;
  }
`;

export default NavBar;
