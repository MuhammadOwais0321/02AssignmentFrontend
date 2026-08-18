import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UpdateUserProfile from "./pages/UpdateUserProfile";
import UserProfile from "./pages/UserProfile";

const App = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path={`/UpdateUserProfile/:id`} element={<UpdateUserProfile />} />
          <Route path={`/userProfile/:id`} element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
