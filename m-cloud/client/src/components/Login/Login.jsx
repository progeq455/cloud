import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user";
import Input from "../Input/Input";
import "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <div>Авторизация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите Email"
      />
      <Input
        value={password}
        setValue={setPassword}
        type="text"
        placeholder="Введите пароль"
      />
      <button onClick={() => dispatch(login(email, password))}>Войти</button>
    </div>
  );
};

export default Login;
