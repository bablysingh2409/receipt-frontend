import Login from "./Login";

import LoginNav from "./LoginNav";

function Home() {
  return (
    <>
      <LoginNav />

      <div className="flex justify-evenly items-center bg-[#034DA5] m-auto p-4 sm:flex-row flex-col gap-4 sm:h-[450px]">
        <Login />
        <div className="sm:w-[40%] w-full sm:border-t-0 border-t sm:mt-0 mt-2">
          <div className="flex flex-col gap-2 justify-center text-white items-center ">
            <h1 className="sm:text-3xl font-bold text-2xl">
              Order and Inventory Management Made Easy
            </h1>
            <ul className="text-lg">
              <li>
                <span className="text-green-500 font-bold">&#10003;</span> Point
                of Sale
              </li>
              <li>
                <span className="text-green-500">&#10003;</span> Online Commerce
              </li>
              <li>
                <span className="text-green-500">&#10003;</span> Employee
                Tracking
              </li>
              <li>
                <span className="text-green-500">&#10003;</span> Sales fleet
                management
              </li>
              <li>
                <span className="text-green-500">&#10003;</span> Business
                Insight
              </li>
            </ul>
          </div>
        </div>
        <div className="w-[30%]">
          <img
            src="https://seller.mulltiply.com/assets/img/login-page-image.png"
            alt="img"
          />
        </div>
      </div>
      <div className="bg-black text-[20px] sm:p-6 p-2">
        <p className="text-[#416397] text-center ">
          Copyright © 2024 . Powered by Mulltiply
        </p>
      </div>
    </>
  );
}

export default Home;
