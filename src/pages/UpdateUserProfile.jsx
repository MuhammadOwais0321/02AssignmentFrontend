import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { toast, ToastContainer, Zoom } from "react-toastify";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useRefreshToken } from "../myMethods.js";
const Profile = (props) => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(false);
  const [profileFormData, setProfileFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const Url = "http://localhost:3000/api/user/updateprofile";

  const [selectedDropdownvalue, setSelectedDropdownvalue] = useState("Male");
  const [address, setAddress] = useState("");
  const [error, setError] = useState('');

  const uploadImageFailed = () =>
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
  const inputsData = [
    {
      type: "text",
      value: profileFormData.first_name,
      palceholder: "First Name",
      name: "first_name",
    },
    {
      type: "text",
      value: profileFormData.last_name,
      palceholder: "Last Name",
      name: "last_name",
    },
    {
      type: "tel",
      value: profileFormData.phone,
      palceholder: "Phone Number",
      name: "phone",
    },
  ];
  const optionsData = [
    {
      value: "Male",
      innerText: "Male",
      name: "Male",
    },
    {
      value: "Female",
      innerText: "Female",
      name: "Female",
    },
    {
      value: "Others",
      innerText: "Others",
      name: "Others",
    },
  ];
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name);

    setProfileFormData({
      ...profileFormData,
      [name]: value,
    });
  };
  const handleDropdown = (e) => {
    setSelectedDropdownvalue(e.target.value);
  };
  const handleTextarea = (e) => {
    setAddress(e.target.value);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    try {
      const responce = await fetch(`${Url}/${userId}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...profileFormData,
          gender: selectedDropdownvalue || "",
          address: address || "",
        }),
      });

      if (responce.status === 403) {
        const data = await useRefreshToken();
        // window.location.reload()
      }
      
      const data = await responce.json();
      if(!responce.ok){
        console.log(data);
        if(data.errors){

          const errKey = Object.keys(data.errors)
          throw new Error(`${errKey[0]}: ${data.errors[errKey[0]]}`)
        }
        throw new Error(data.message)
      }
      console.log(data);
      if (data.success === true) {
        navigate(`/userProfile/${localStorage.getItem("userId")}`);
      }
    } catch (error) {
      setError(error.message)
    }
  };
  return (
    <>
      <div className="bg-blue-500 w-full h-screen flex justify-center items-center">
        <form
          onSubmit={formSubmitHandler}
          className=" bg-white h-160 w-110 gap-2.5 rounded-2xl flex  flex-col justify-center items-center"
        >
          <div className="size-50 rounded-full bg-gray-400 relative">
            {userImage ? (
              <img src={userImage} />
            ) : (
              <FaRegUserCircle className="size-full text-white" />
            )}
            <CiCirclePlus
              onClick={uploadImageFailed}
              className="absolute bottom-3 right-3 size-10 bg-white rounded-full text-gray-600"
            />
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

          <div className="grid grid-cols-2 gap-2.5 mt-7 ">
            {inputsData.map((input, index) => {
              return (
                <input
                  key={index}
                  className="py-1 px-2.5 h-10 w-50 text-sm bg-white rounded-sm border  border-gray-700/60 font-bold placeholder:font-medium"
                  onChange={onChangeHandler}
                  type={input.type}
                  name={input.name}
                  placeholder={input.palceholder}
                  value={input.value}
                />
              );
            })}
            <select
              name="gender"
              id="options-select"
              className='py-1 px-2.5 h-10 w-50 text-sm text-black/80 bg-white rounded-sm border  border-gray-700/60" font-bold
            '
              value={selectedDropdownvalue}
              onChange={handleDropdown}
            >
              {optionsData.map((option, index) => {
                return (
                  <option
                    key={index}
                    value={option.value}
                    name={option.name}
                    className="text-black/80 font-bold"
                  >
                    {option.innerText}
                  </option>
                );
              })}
            </select>
            <textarea
              onChange={handleTextarea}
              placeholder="add your proper address"
              rows={5}
              type="text"
              name="address"
              className="border  border-gray-500/80 p-2  col-span-2 "
            />
          </div>
          <Button type="submit" value="submit" />
        {!error == '' ? <p className="text-red-600">{error}</p>: ''}
        </form>
      </div>
    </>
  );
};

export default Profile;
