import React from "react";
import { useDispatch } from "react-redux";
import { deleteAvatar, uploadAvatar } from "../../actions/user";

const Profile = () => {
    const dispatch = useDispatch();

    function changeAvatar(e) {
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }

    return (
        <div>
            <button onClick={() => dispatch(deleteAvatar())}>удалить аватар</button>
            <input accept="image/*" type="file" placeholder="Загрузить аватар" onChange={(e) => changeAvatar(e)}/>
        </div>
    )
} 

export default Profile;