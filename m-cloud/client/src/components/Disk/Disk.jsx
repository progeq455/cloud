import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setPopupDisplay } from "../../reducers/fileReducer";
import FileList from "./fileList/FileList";
import Popup from "./Popup";
import Uploader from "./Uploader/Uploader";
import s from "./Disk.module.css";

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const loader = useSelector((state) => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function setPopupHandler() {
    dispatch(setPopupDisplay('flex'));
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId));
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  }

  function dragEnterHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  }

  function dragLeaveHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  }

  function dropHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  }

  if (loader) {
    return (
      <div className={s.loaderBlock}>
        <div className={s.loader}>Loading...</div>
      </div>
    )
  }

  return ( !dragEnter ?
    <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      <div>
        <button onClick={() => backClickHandler()}>Назад</button>
        <button onClick={() => setPopupHandler()}>Создать папку</button>
        <div>
          <label htmlFor="finput">Загрузить файл</label>
          <input type="file" multiple={true} id="finput" onChange={(event) => fileUploadHandler(event)}/>
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="name">По имени</option>
          <option value="type">По типу</option>
          <option value="date">По дате</option>
        </select>
      </div>
      <FileList />
      <Popup />
      <Uploader/>
    </div>
    : 
    <div className={s.drop_area} onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      Перетащите сюда файлы
    </div>
  );
};

export default Disk;
