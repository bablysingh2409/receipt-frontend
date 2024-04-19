import { BsTelephone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

function LoginNav() {
  return (
    <div className="w-full border-b p-1">
      <div className="flex flex-row justify-between items-center p-3">
        <div className="flex flex-row justify-center items-center gap-2 ">
          <img
            src="https://seller.mulltiply.com/assets/img/mulltiply-header-icon.png"
            alt="logo"
            className="w-[100px] sm:w-auto"
          />
          <p className="text-xs text-center sm:text-lg">
            Reimagining
            {/* <br className="sm:hidden" /> */}
            Connected Commerce
          </p>
        </div>
        <div className="flex-row gap-4 justify-center items-center sm:flex hidden">
          <p className="flex sm:flex-row justify-center items-center sm:gap-2 text-sm sm:text-lg flex-col">
            <span className="">
              <BsTelephone />
            </span>
            +917703971804
          </p>
          <p className="flex sm:flex-row justify-center items-center sm:gap-2 text-sm sm:text-lg flex-col">
            <span className="">
              <AiOutlineMail />
            </span>
            admin@mulltiply.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginNav;
