import React, { useState, useRef, useEffect, useContext } from "react";
import { API_URL } from "../../../server/db_access.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../actions";
import { CenterContainer } from "../styles/CenterContainer.styled";
import { Button } from "../styles/Button.styled";
import {
  Card,
  CardFormGroup,
  CardTitle,
  CardFooter,
  CardErrorMessage,
} from "../styles/Card.styled";

const Login = () => {
  let currentUser = useSelector((state) => state.user);
  let dispatch = useDispatch();
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("Admin1");

  let [errors, setErrors] = useState({
    email: [],
    password: [],
  });
  let myEmailRef = useRef();

  let navigate = useNavigate();

  let [loginMessage, setLoginMessage] = useState("");
  // Флаги загораются когда поле ввода использовано (тогда делаем валидацию, если поле не трогали, то до Сабмита не валидируем)
  let [dirty, setDirty] = useState({
    email: false,
    password: false,
  });

  // Устанавливаем заголовок страницы и фокус на первый инпут
  useEffect(() => {
    document.title = "Login - eCommerce";
    myEmailRef.current.focus();
  }, []);

  //Валидация формы Логина
  let validate = () => {
    let errorsData = {};
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-+.']\w+)*\.\w+([-+.']\w+)*/;
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;

    //Проверка email
    errorsData.email = [];
    if (!email) {
      errorsData.email.push("Введите E-mail");
    }
    if (email) {
      if (!validEmailRegex.test(email)) {
        errorsData.email.push("Email должен соответствовать формату ");
      }
    }

    //Пароль
    errorsData.password = [];
    //Пароль не может быть пустым
    if (!password) {
      errorsData.password.push("Введите пароль");
    }
    if (password) {
      if (!validPasswordRegex.test(password)) {
        errorsData.password.push(
          "Пароль должен быть от 6 до 15 символов, включая как минимум по одной строчной и прописной букве и цифру"
        );
      }
    }

    setErrors(errorsData);
  };

  useEffect(validate, [email, password]);

  // При сабмите формы валидируем и проверяем в базе пользователя Логин, пароль
  let onLoginClick = async () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();

    if (isValid()) {
      try {
        let user = await axios.get(
          `${API_URL}/users?email=${email}&password=${password}`
        );
        // Если в базе совпали логин и пароль авторизуем пользователя
        if (user.data.length > 0) {
          dispatch(
            actions.login({
              currentUserId: user.data[0].id,
              currentUserName: user.data[0].fullName,
              currentUserRole: user.data[0].role,
            })
          );
          // Простой пользователь идёт в кабинет
          if (user.data[0].role === "user") {
            navigate("/dashboard");
          } else if (user.data[0].role === "admin") {
            // админ идёт в админку
            navigate("/products");
          }
        } else {
          setLoginMessage(<span>Неверный Логин/Пароль</span>);
        }
      } catch (err) {
        <span>Что-то пошло не так. Попробуйте позже</span>;
      }
    }
  };

  let isValid = () => {
    let valid = true;
    //reading all errors
    for (let control in errors) {
      if (errors[control].length > 0) {
        valid = false;
      }
    }
    return valid;
  };

  return (
    <CenterContainer>
      <Card>
        <CardTitle>Войти на сайт</CardTitle>

        {/* email starts */}
        <CardFormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            ref={myEmailRef}
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => {
              setDirty({ ...dirty, email: true });
              validate();
            }}
            placeholder="Email"
          ></input>
          <CardErrorMessage>
            {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
          </CardErrorMessage>
        </CardFormGroup>

        {/* email ends */}

        {/* password starts */}
        <CardFormGroup>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => {
              setDirty({ ...dirty, password: true });
              validate();
            }}
            placeholder="Password"
          ></input>
          <CardErrorMessage>
            {dirty["password"] && errors["password"][0]
              ? errors["password"]
              : ""}
          </CardErrorMessage>
        </CardFormGroup>

        {/* password ends */}

        {loginMessage ? (
          <CardErrorMessage>{loginMessage}</CardErrorMessage>
        ) : null}
        <CardFooter>
          <Button onClick={onLoginClick}>Вход</Button>
          <a
            href="/register"
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Регистрация
          </a>
        </CardFooter>

        <p>Тестовый админ: admin@admin.com / Admin1</p>
        <p>Тестовый пользователь: testuser@user.com / Testuser1</p>
      </Card>
    </CenterContainer>
  );
};

export default Login;
