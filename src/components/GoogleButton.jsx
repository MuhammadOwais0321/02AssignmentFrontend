import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const GoogleButton = (props) => {
  const GoogleToast = () =>
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
        onClick={GoogleToast}
        type="button"
        className="py-3 relative hover:bg-gray-200 hover:text-gray-900 cursor-pointer font-sans  w-80  text-gray-700/50 bg-transparent rounded-sm border flex justify-center items-center border-gray-700/50"
      >
        <span className="absolute left-3 ">
          <FcGoogle className=" size-8 " />
        </span>
        Login with Google
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

export default GoogleButton;
