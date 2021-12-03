import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { deleteFile, downloadFile } from "../../../../actions/file";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import sizeFormat from "../../../../utils/sizeFormat";
import s from "./File.module.css";

const File = ({file}) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    function openHandler() {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadHandler(e) {
        e.stopPropagation();
        downloadFile(file);
    }

    function deleteHandler(e) {
        e.stopPropagation();
        dispatch(deleteFile(file));
    }

    return (
        <div onClick={() => openHandler(file)} className={s.file}>
            <div>{file.name}</div>
            <div>{file.date.slice(0, 10)}</div>
            <div>{sizeFormat(file.size)}</div>
            {file.type !== "dir" && <button className={s.btn} onClick={(e) => downloadHandler(e)}>скачать</button>}
            <button className={s.btn} onClick={(e) => deleteHandler(e)}>удалить</button>
        </div>
    );
}

export default File;