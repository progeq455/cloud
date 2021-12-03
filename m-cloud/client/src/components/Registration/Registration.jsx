import React, { useState } from "react";
import { registration } from "../../actions/user";
import Input from "../Input/Input";
import "./Registration.module.css";

const Registration = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div>
            <div>Регистрация</div>
            <Input value={email} setValue={setEmail} type="text" placeholder="Введите Email"/>
            <Input value={password} setValue={setPassword} type="text" placeholder="Введите пароль"/>
            <button onClick={() => registration(email, password)}>Зарегистрироваться</button>
        </div>
    )
}

export default Registration;