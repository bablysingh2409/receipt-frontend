import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/api";

function ReceiptHomePage() {
  const [legalName, setLegalName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = JSON.parse(localStorage.getItem("profileData"));
        if (profileData) {
          setLegalName(profileData.defaultWorkspace.legalName);
        } else {
          const data = await getProfile();
          setLegalName(data.defaultWorkspace.legalName);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full   flex justify-center items-center">
      <div className="text-center  flex flex-col gap-12 mt-14 ">
        <h1 className="text-2xl font-serif">WELCOME TO MULLTIPLY</h1>
        <p className="text-center text-[#2067b3] text-3xl font-semibold">
          {legalName}
        </p>
        <Link to="/nav/receipt-form">
          <button
            // onClick={handleCapture}
            className="w-[150px] h-[35px] rounded-md bg-[#156BD0] text-[16px] font-bold text-white"
          >
            Add Receipt
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ReceiptHomePage;
