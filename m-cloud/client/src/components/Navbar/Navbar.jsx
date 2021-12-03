import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFiles, searchFiles } from "../../actions/file";
import { API_URL } from "../../config";
import { showLoader } from "../../reducers/appReducer";
import { logOut } from "../../reducers/userReducer";
import "./Navbar.module.css";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth);
    const currentDir = useSelector(state => state.files.currentDir);
    const currentUser = useSelector(state => state.user.currentUser);
    const [searchName, setSearchName] = useState("");
    const [searchTimeOut, setSearchTimeOut] = useState(false);
    const dispatch = useDispatch();
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : "";

    function searchHandler(e) {
        setSearchName(e.target.value);
        if (searchTimeOut !== false) {
            clearTimeout(searchTimeOut);
        }
        dispatch(showLoader());
        if (e.target.value !== "") {
            setSearchTimeOut(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, e.target.value))
        } else {
            dispatch(getFiles(currentDir))
        }
    }

    return (
        <div>
            <h1>Logo</h1>
            {!isAuth && <div><NavLink to="/login">Войти</NavLink></div>}
            {!isAuth && <div><NavLink to="/registration">Зарегистрироваться</NavLink></div>}
            {isAuth && <NavLink to="/profile">
               {avatar === "" ? <div>Профиль</div> : <img src={avatar} alt="" style={{width: "50px", borderRadius: "50%"}}/>}
                </NavLink>}
            {isAuth && <div onClick={() => dispatch(logOut())}>Выйти</div>}
            {isAuth && <input type="text" placeholder="Поиск файлов" value={searchName} onChange={(e) => searchHandler(e)}/>}
        </div>
    )
}

export default Navbar;