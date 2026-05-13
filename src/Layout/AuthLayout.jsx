import { Outlet } from "react-router";
import DarkMood from "../Utils/DarkMood";

const AuthLayout = () => {
  return (
    <div>
      <div className="hidden">
        <DarkMood />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
