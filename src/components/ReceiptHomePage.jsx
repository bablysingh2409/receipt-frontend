import { Link } from "react-router-dom";

function ReceiptHomePage() {
  return (
    <div className="w-full   flex justify-center items-center">
      <div className="text-center p-8 flex flex-col gap-12 mt-14 ">
        <h1 className="text-2xl font-serif">WELCOME TO MULLTIPLY</h1>
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
