import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";

export default function Login() {
  const [isPhoneVerify, setIsPhoneVerify] = useState(false);
  const [userLoginData, setUserLoginData] = useState({
    phone: "",
    countryCode: "91",
  });
  const navigate = useNavigate();
  const [isOTPSend, setIsOtpSend] = useState(false);
  const [otp, setOtp] = useState("");
  //   const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { setIsLogin } = useAuth();

  const handleOTPRequest = async () => {
    // e.preventDefault();
    setIsPhoneVerify(true);

    try {
      const res = await axios.post(`https://api.mulltiply.org/auth/otp-login`, {
        phone: userLoginData.phone,
        countryCode: userLoginData.countryCode,
      });
      // localStorage.setItem('adminPhone',userLoginData.phone);
      console.log(res);
      if (res.status === 200) {
        setIsOtpSend(true);
        // toast("OTP sent successfully");
      }
    } catch (err) {
      console.error("Error occurred:", err);
        toast(err.response.data.message);
    }
    // {
    //     "phone": "8240347308",
    //     "countryCode": "91"
    // }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await axios.post(
        `https://api.mulltiply.org/auth/otp-login-verify`,
        {
          phone: userLoginData.phone,
          countryCode: userLoginData.countryCode,
          otp: otp,
        }
      );

      if (res.status === 200) {
        console.log("login response", res);
        toast("login successfully");
        setIsLogin(true);
        localStorage.setItem("login", true);
        localStorage.setItem("token", res.data?.data.token);
        navigate("/nav/receipt-home-page");
      }
    } catch (err) {
        toast(err.response.data.message);
      console.log(err.response.message);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (!isPhoneVerify) {
        handleOTPRequest();
      } else {
        handleVerifyOTP();
      }
    }
  };


  return (
    <>
      {/* <LoginNav /> */}
      <div className="sm:w-[40%] w-full flex justify-center bg-white rounded-md p-2 ">
        <div className=" flex flex-col  w-full justify-center ">
          <div className="flex flex-col border-b p-2 ">
            <h2 className=" font-sans text-[25px] font-semibold text-[#012467] ">
              Login
            </h2>
          </div>
          <div className="sm:w-[304.951px] sm:h-[150px] flex items-center m-5">
            <form className="flex flex-col justify-center gap-2 ">
              <div className="flex gap-1 flex-col">
                <label className="font-sans font-semibold text-[14px] pl-1">
                  Enter Mobile Number
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setUserLoginData({
                      ...userLoginData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Enter Mobile Number"
                  className="sm:w-[296.494px] sm:h-[40.711px] rounded-md border border-[#D9D9D9] p-1"
                  onKeyPress={handleKeyPress}
                />
              </div>
              {isPhoneVerify && (
                <div className="flex gap-1 flex-col">
                  <label className="font-sans font-semibold text-[14px] pl-1">
                    Enter OTP
                  </label>
                  <input
                    type="number"
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="# OTP"
                    className="sm:w-[296.494px] sm:h-[40.711px] rounded-md border border-[#D9D9D9] p-1
                    "
                  />
                </div>
              )}
            </form>
          </div>
          <button
            onClick={!isOTPSend ? handleOTPRequest : handleVerifyOTP}
            onKeyPress={handleKeyPress}
            className="sm:w-[150px] sm:h-[40px] rounded-md bg-[#059f30] sm:text-[16px] font-bold text-white
            w-[100px] h-[35px] text-[14px] "
          >
            {!isPhoneVerify ? "GET OTP" : "Login"}
          </button>
        </div>
      </div>
    </>
  );
}
