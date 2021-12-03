import React from "react";
import { useDispatch } from "react-redux";
import { removeUploadFile } from "../../../reducers/uploadReducer";
import s from "./UploadFile.module.css";

const UploadFile = ({file}) => {
    const dispatch = useDispatch();

    return (
        <div className={s.upload_file}>
            <div className={s.upload_file__header}>
                <div className={s.upload_file__name}>{file.name}</div>
                <div className={s.upload_file__remove} onClick={() => dispatch(removeUploadFile(file.id))}>X</div>
            </div>
            <div className={s.upload_file__progress}>
                <div className={s.upload_file__upload_bar} style={{width: file.progress + "%"}}/>
                <div className={s.upload_file__percent}>{file.progress}%</div>
            </div>
        </div>
    )
}

export default UploadFile;