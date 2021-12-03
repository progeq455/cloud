import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import Disk from "./components/Disk/Disk";
import Profile from "./components/Profile/Profile";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        {!isAuth ? (
          <Routes>
            <Route path="/registration" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<Disk />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
