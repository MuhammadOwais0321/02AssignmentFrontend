import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link,  redirect, useNavigate } from "react-router-dom";
import FacebookButtton from "../components/FacebookButtton";
import GoogleButton from "../components/GoogleButton";
import { toast, ToastContainer, Zoom } from "react-toastify";

const Login = (props) => {
  const ForgotPasswordToast = () =>
    toast.info("Feature comming soon", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  const authUrl = "http://localhost:3000/api/";

  const inputsData = [
    {
      type: "email",
      placeholder: "Email",
      value: loginFormData.email,
      name: "UserEmail",
    },
    {
      type: "password",
      placeholder: "Password",
      value: loginFormData.password,
      name: "UserPassword",
    },
  ];
  const onChangeHandler = (e) => {
    const { type, value } = e.target;
    console.log(type);

    setLoginFormData({
      ...loginFormData,
      [type]: value,
    });
  };
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setErrmsg("");
      const responce = await fetch(`${authUrl}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginFormData),
      });
      const data = await responce.json();
      if (!responce.ok) {
        throw new Error(data.message);
      }
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user._id);

      navigate(`/UpdateUserProfile/${data.user._id}`);
    } catch (error) {
      console.log(error);

      setErrmsg(error.message);
    }
  };
  return (
    <div className="w-full h-screen bg-blue-500/80 flex justify-center items-center roun">
      <form onSubmit={loginSubmitHandler}>
        <div className=" bg-white h-160 w-120 rounded-2xl flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-extrabold ">Login</h1>

          {inputsData.map((data, index) => {
            return (
              <Input
                handleInputValue={onChangeHandler}
                value={data.value}
                key={index}
                type={data.type}
                placeholder={data.placeholder}
              />
            );
          })}

          <div className=" cursor-pointer">
            <p
              onClick={ForgotPasswordToast}
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot password ?
            </p>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Zoom}
            />
          </div>
          <Button type="submit" value="Login" />
          <p className={`text-red-600  ${errmsg ? "block" : "hidden"}`}>
            {errmsg}
          </p>
          <p className="">
            Don't have have an account ?{" "}
            <Link className=" text-blue-500 hover:text-blue-700" to={"/"}>
              Signup
            </Link>
          </p>

          <div className="w-full flex items-center justify-center gap-3">
            <hr className="w-[40%]" />
            Or
            <hr className="w-[40%]" />
          </div>
          <div className="space-y-2">
            <FacebookButtton />

            <GoogleButton />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
