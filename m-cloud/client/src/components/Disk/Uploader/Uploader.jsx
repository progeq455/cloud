import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";
import s from "./Uploader.module.css";
import UploadFile from "./UploadFile";

const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();

    return (isVisible && 
        <div className={s.uploader}>
            <div className={s.uploader__header}>
                <div className={s.uploader__title}>Загрузки</div>
                <div className={s.uploader__close} onClick={() => dispatch(hideUploader())}>X</div>
            </div>
            {files.map(file => <UploadFile key={file.id} file={file}/>)}
        </div>
    )
}

export default Uploader;