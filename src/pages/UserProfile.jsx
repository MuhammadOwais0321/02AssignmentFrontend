import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useRefreshToken } from "../myMethods";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";

const UserProfile = (props) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const Url = "http://localhost:3000/api/user/userProfile";
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const data = useEffect(() => {
    if (!token) {
      throw new Error("something went wrong");
    }
    try {
      const fetchingUserProfile = async () => {
        const res = await fetch(`${Url}/${userId}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 403) {
          useRefreshToken();
          navigate(`/userProfile/${userId}`);
        }
        const data = await res.json();

        setUserInfo(data.user);
      };
      fetchingUserProfile();
      if (!userInfo.profile_pic) {
        setProfilePic("");
      }
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <div className="bg-blue-500 w-full h-screen flex justify-center items-center">
        <div className="bg-white h-160 w-120 rounded-2xl flex  gap-y-10 flex-col justify-center items-center">
          <div className="size-50 rounded-full bg-gray-400 relative ">
            {profilePic != "" ? (
              <img src={profilePic} />
            ) : (
              <FaRegUserCircle className="size-full text-white" />
            )}
          </div>
          <div className="flex flex-col justify-center items-center gap-y-6 gap-x-10  w-full ">
            <div className="flex justify-between p-1 rounded-2xl border border-gray-500 w-[80%]  ">
              <h1 className=" ">First Name</h1>
              <p>{userInfo.first_name}</p>
            </div>
            <div className="flex justify-between p-1 rounded-2xl border border-gray-500 w-[80%]  ">
              <h1>last Name</h1>
              <p>{userInfo.last_name}</p>
            </div>
            <div className="flex justify-between p-1 rounded-2xl border border-gray-500 w-[80%]  ">
              <h1>Phone Number</h1>
              <p>{userInfo.phone}</p>
            </div>
            <div className="flex justify-between p-1 rounded-2xl border border-gray-500 w-[80%]  ">
              <h1>Gender</h1>
              <p>{userInfo.gender}</p>
            </div>
            <div className="flex justify-between p-1 rounded-2xl border border-gray-500 w-[80%]  ">
              <h1>Address</h1>
              <p>{userInfo.address}</p>
            </div>
          </div>
          <Link to={`/UpdateUserProfile/${userId}`}>
          
          <Button type={'button'} value={'Update Profile'}/>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
