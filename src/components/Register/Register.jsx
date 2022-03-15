import React, { useState, useRef, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
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
  CheckBoxGroup,
  RadioInputGroup,
  RadioInputItem,
} from "../styles/Card.styled";

const Register = () => {
  let dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetters: false,
  });
  const navigate = useNavigate();

  let [counties] = useState([
    { id: 1, countryName: "Россия" },
    { id: 2, countryName: "USA" },
    { id: 3, countryName: "UK" },
    { id: 4, countryName: "France" },
    { id: 5, countryName: "Germany" },
    { id: 6, countryName: "Brazil" },
    { id: 7, countryName: "Japan" },
  ]);

  const [errors, setErrors] = useState({
    email: [],
    password: [],
    fullName: [],
    dateOfBirth: [],
    gender: [],
    country: [],
    receiveNewsLetters: [],
  });

  // Поля сначала неиспачканы, если мы не вводили ничего в них не показываем ошибку до Сабмита формы
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    dateOfBirth: false,
    gender: false,
    country: false,
    receiveNewsLetters: false,
  });

  const [message, setMessage] = useState("");

  // Валидация формы
  let validate = () => {
    let errorsData = {};
    const validEmailRegex = /\w+([-+.']\w+)*@\w+([-+.']\w+)*\.\w+([-+.']\w+)*/;
    const validPasswordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15})/;

    //email
    errorsData.email = [];

    //email не может быть пустым и должен быть по формату
    if (!state.email) {
      errorsData.email.push("Введите Email");
    }
    if (state.email) {
      if (!validEmailRegex.test(state.email)) {
        errorsData.email.push("Email должен соответствовать формату");
      }
    }

    //Пароль
    errorsData.password = [];
    //Пароль не может быть пустым
    if (!state.password) {
      errorsData.password.push("Введите пароль");
    }
    if (state.password) {
      if (!validPasswordRegex.test(state.password)) {
        errorsData.password.push(
          "Пароль должен быть от 6 до 15 символов, включая как минимум по одной строчной и прописной букве и цифру"
        );
      }
    }
    //Имя не может быть пустым
    errorsData.fullName = [];
    if (!state.fullName) {
      errorsData.fullName.push("Введите имя");
    }

    // Дата рождения не пустая
    errorsData.dateOfBirth = [];
    if (!state.dateOfBirth) {
      errorsData.dateOfBirth.push("Введите дату рождения");
    }

    //Возраст должен быть больше 18 лет
    if (state.dateOfBirth) {
      let dob = new Date(state.dateOfBirth).getTime();
      let today = new Date().getTime();
      if (today - 18 * 365.25 * 24 * 60 * 60 * 1000 < dob) {
        errorsData.dateOfBirth.push("Вы должны быть старше 18 лет");
      }
    }
    //Пол не пустой
    errorsData.gender = [];
    if (!state.gender) {
      errorsData.gender.push("Пожалуйста, укажите пол");
    }
    //Указать страну
    errorsData.country = [];
    if (!state.country) {
      errorsData.country.push("Пожалуйста, выберите страну");
    }
    errorsData.receiveNewsLetters = [];
    setErrors(errorsData);
  };

  useEffect(validate, [state]);

  useEffect(() => {
    document.title = "Регистрация - eCommerce";
  }, []);

  let onRegisterClick = async () => {
    //Делаем все поля грязными с целью проверки
    let dirtyData = dirty;
    Object.keys(dirty).forEach((control) => {
      dirtyData[control] = true;
    });
    setDirty(dirtyData);
    validate();

    if (isValid()) {
      setMessage(<span>Успешно</span>);

      try {
        let user = await axios.post(`${API_URL}/users`, {
          id: uuidv4(),
          email: state.email,
          password: state.password,
          fullName: state.fullName,
          dateOfBirth: state.dateOfBirth,
          gender: state.gender,
          country: state.country,
          receiveNewsLetters: state.receiveNewsLetters,
          role: "user",
        });

        setMessage(<span>Успешная регстрация</span>);
        if (user.data) {
          dispatch(
            actions.login({
              currentUserId: user.data.id,
              currentUserName: user.data.fullName,
              currentUserRole: user.data.role,
            })
          );
          navigate("/dashboard");
        } else {
          setMessage(
            <span className="text-danger">Ошибка при регистрации</span>
          );
        }
      } catch (err) {
        setMessage(<span>Ошибка регистрации</span>);
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
        <CardTitle>Register</CardTitle>

        {/* email starts */}
        <CardFormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={state.email}
            onChange={(e) => {
              setState({ ...state, [e.target.name]: e.target.value });
            }}
            onBlur={(event) => {
              setDirty({ ...dirty, [event.target.name]: true });
              validate();
            }}
          />
          <CardErrorMessage>
            {dirty["email"] && errors["email"][0] ? errors["email"] : " "}
          </CardErrorMessage>
        </CardFormGroup>
        {/* email ends */}

        {/* password starts */}
        <CardFormGroup>
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={(e) => {
              setState({ ...state, [e.target.name]: e.target.value });
            }}
            onBlur={(event) => {
              setDirty({ ...dirty, [event.target.name]: true });
              validate();
            }}
          />
          <CardErrorMessage>
            {dirty["password"] && errors["password"][0]
              ? errors["password"]
              : " "}
          </CardErrorMessage>
        </CardFormGroup>
        {/* password ends */}

        {/* fullName starts */}
        <CardFormGroup>
          <label htmlFor="fullName">Фамилия Имя</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={state.fullName}
            onChange={(e) => {
              setState({ ...state, [e.target.name]: e.target.value });
            }}
            onBlur={(event) => {
              setDirty({ ...dirty, [event.target.name]: true });
              validate();
            }}
          />
          <CardErrorMessage>
            {dirty["fullName"] && errors["fullName"][0]
              ? errors["fullName"]
              : " "}
          </CardErrorMessage>
        </CardFormGroup>
        {/* fullName ends */}

        {/* dateOfBirth starts */}
        <CardFormGroup>
          <label htmlFor="dateOfBirth">Дата рождения</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={state.dateOfBirth}
            onChange={(e) => {
              setState({ ...state, [e.target.name]: e.target.value });
            }}
            onBlur={(event) => {
              setDirty({ ...dirty, [event.target.name]: true });
              validate();
            }}
          />
          <CardErrorMessage>
            {dirty["dateOfBirth"] && errors["dateOfBirth"][0]
              ? errors["dateOfBirth"]
              : " "}
          </CardErrorMessage>
        </CardFormGroup>
        {/* dateOfBirth ends */}
        {/* gender starts */}
        <CardFormGroup>
          <label>Пол</label>
          <RadioInputGroup>
            <RadioInputItem>
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                checked={state.gender === "male" ? true : false}
                onChange={(e) => {
                  setState({ ...state, [e.target.name]: e.target.value });
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />
              <label htmlFor="male">Муж</label>
            </RadioInputItem>
            <RadioInputItem>
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                checked={state.gender === "female" ? true : false}
                onChange={(e) => {
                  setState({ ...state, [e.target.name]: e.target.value });
                }}
                onBlur={(event) => {
                  setDirty({ ...dirty, [event.target.name]: true });
                  validate();
                }}
              />
              <label htmlFor="female">Жен</label>
            </RadioInputItem>
            <CardErrorMessage>
              {dirty["gender"] && errors["gender"][0] ? errors["gender"] : " "}
            </CardErrorMessage>
          </RadioInputGroup>
        </CardFormGroup>
        {/* gender ends */}
        {/* country starts */}
        <CardFormGroup>
          <label htmlFor="country">Страна</label>

          <select
            name="country"
            id="country"
            value={state.country}
            onChange={(e) => {
              setState({ ...state, [e.target.name]: e.target.value });
            }}
            onBlur={(event) => {
              setDirty({ ...dirty, [event.target.name]: true });
              validate();
            }}
          >
            <option value="">Выберите страну...</option>
            {counties.map((country) => (
              <option key={country.id} value={country.id}>
                {country.countryName}
              </option>
            ))}
          </select>
          <CardErrorMessage>
            {dirty["country"] && errors["country"][0] ? errors["country"] : " "}
          </CardErrorMessage>
        </CardFormGroup>
        {/* country ends */}
        {/* receiveNewsLetters starts */}
        <CardFormGroup>
          <div>
            <RadioInputItem>
              <input
                type="checkbox"
                name="receiveNewsLetters"
                value="true"
                id="receiveNewsLetters"
                className="form-check-input"
                checked={state.receiveNewsLetters === true ? true : false}
                onChange={(e) => {
                  setState({ ...state, [e.target.name]: e.target.checked });
                }}
              />
              <label htmlFor="receiveNewsLetters">
                Получать новости на e-mail
              </label>
            </RadioInputItem>
          </div>
        </CardFormGroup>
        {/* receiveNewsLetters ends */}
        <div>{message}</div>
        <CardFooter>
          <Button onClick={onRegisterClick}>Регистрация</Button>
        </CardFooter>
      </Card>
    </CenterContainer>
  );
};

export default Register;
