import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import FacebookButtton from "../components/FacebookButtton";
import GoogleButton from "../components/GoogleButton";

const Signup = (props) => {
  const [signupFormData, setSignupFormData] = useState({
    email: "",
    password: "",
    text: "",
  });
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  const authUrl = "http://localhost:3000/api/";

  const inputsData = [
    {
      type: "email",
      placeholder: "Email",
      value: signupFormData.email,
      name: "UserEmail",
    },
    {
      type: "password",
      placeholder: "Password",
      value: signupFormData.password,
      name: "UserPassword",
    },
    {
      type: "text",
      placeholder: "Enter your Name",
      value: signupFormData.text,
      name: "UserName",
    },
  ];
  const onChangeHandler = (e) => {
    const { type, value } = e.target;
    console.log(type);

    setSignupFormData({
      ...signupFormData,
      [type]: value,
    });
  };
  const signupSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setErrmsg("");
      const responce = await fetch(`${authUrl}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(signupFormData),
      });
      const data = await responce.json();
      if (!responce.ok) {
        throw new Error(data.message);
      }
      console.log("success", data);
      navigate("/login");
    } catch (error) {
      console.log(error);

      setErrmsg(error.message);
    }
  };
  return (
    <div className="w-full h-screen bg-blue-500/80 flex justify-center items-center roun">
      <form onSubmit={signupSubmitHandler}>
        <div className=" bg-white h-160 w-120 rounded-2xl flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-extrabold ">Signup</h1>

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

          <Button type="submit" value="Signup" />
          <p className={`text-red-600  ${errmsg ? "block" : "hidden"}`}>
            {errmsg}
          </p>
          <p>
            Already have an account{' '}
            <Link className="text-blue-500 hover:text-blue-700" to={"/login"}>
              Login
            </Link>
          </p>

          <div className="w-full flex items-center justify-center gap-3">
            <hr className="w-[40%]" />
            Or
            <hr className="w-[40%]" />
          </div>
<div className="space-y-2">

         <FacebookButtton/>
         
         <GoogleButton/>
</div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
