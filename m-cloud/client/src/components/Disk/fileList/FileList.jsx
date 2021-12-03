import React from "react";
import { useSelector } from "react-redux";
import File from "./file/File";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./FileList.css";

const FileList = () => {
    const files = useSelector(state => state.files.files);

    if (files.length === 0) {
        return (
            <div>Файлы не найдены</div>
        )
    }

    return (
        <div>
            <TransitionGroup>
            {files.map(file => 
            <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            onExit={false}
            >
                <File file={file}/>
            </CSSTransition>
            )}
            </TransitionGroup>
        </div>
    );
}

export default FileList;