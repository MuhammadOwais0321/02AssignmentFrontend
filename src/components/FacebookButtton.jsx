import { MdFacebook } from "react-icons/md";
import { toast, ToastContainer, Zoom } from "react-toastify";

const FacebookButtton = (props) => {
      const FacebookToast = () =>
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
  return (
    <>
      <button
      onClick={FacebookToast}
        type="button"
        className="py-3 hover:bg-blue-700 hover:text-gray-200 relative cursor-pointer font-sans  w-80  text-white bg-blue-800 rounded-sm border flex justify-center items-center border-white"
      >
        <span className="absolute left-3 ">
          <MdFacebook className=" size-8 " />
        </span>
        Login with Facebook
      </button>
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
    </>
  );
};

export default FacebookButtton;
