import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDir } from "../../actions/file";
import { setPopupDisplay } from "../../reducers/fileReducer";
import Input from "../Input/Input";
import s from "./Popup.module.css";

const Popup = () => {
    const [dirName, setDirName] = useState("");
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector((state) => state.files.currentDir);
    const dispatch = useDispatch();

    function createHandler() {
        dispatch(createDir(currentDir, dirName));
        setTimeout(dispatch(setPopupDisplay("none")));
    }

    return (
        <div className={s.popup} onClick={() => dispatch(setPopupDisplay("none"))} style={{display: popupDisplay}}>
            <div className={s.popup__content} onClick={(event) => event.stopPropagation()}>
                <div className={s.popup__header}>
                <div className={s.popup__title}>Создать новую папку</div>
                <button className={s.popup__close} onClick={() => dispatch(setPopupDisplay("none"))}>X</button>
                </div>
            <Input type="text" placeholder="Введите название папки" value={dirName} setValue={setDirName}/>
            <button className={s.popup__create} onClick={() => createHandler()}>Создать</button>
            </div>
        </div>
    )
}

export default Popup;