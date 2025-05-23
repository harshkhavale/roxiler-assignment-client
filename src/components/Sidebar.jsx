import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { logout } from "../store/slices/auth";
import { dashboardOptions } from "../constants";

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);
  const options = dashboardOptions[role] || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <>
      <div className="md:hidden absolute top-2 p-4 flex-col justify-between items-center">
        <button
          className=" "
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <Menu />
        </button>
      </div>

      <aside className="hidden md:flex flex-col w-64 pt-20 h-screen bg-primary text-white p-5">
      
        <ul className="space-y-4">
          {options.map((opt, idx) => (
            <li key={idx}>
              <NavLink
                to={opt.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive ? "bg-gray-700" : "hover:bg-gray-800"
                  }`
                }
              >
                {opt.icon}
                <span>{opt.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="pt-6 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md  border-white hover:bg-white hover:text-black w-full transition-colors"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />

          <aside className="relative z-50 w-full bg-primary text-white p-5 h-full">
            <div className="flex items-center gap-4 justify-between mb-10">
              <div className=" bg-white text-base p-2 text-black capitalize font-bold">{role} Dashboard</div>
              <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
                <X />
              </button>
            </div>

            <ul className="space-y-4">
              {options.map((opt, idx) => (
                <li key={idx}>
                  <NavLink
                    to={opt.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive ? "bg-gray-700" : "hover:bg-gray-800"
                      }`
                    }
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="pt-6 mt-auto">
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-md  border-white hover:bg-white hover:text-black w-full transition-colors"
              >
                <LogOut />
                Logout
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;