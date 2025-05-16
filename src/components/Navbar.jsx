import { useSelector } from "react-redux";

const Navbar = () => {
  const role = useSelector((state) => state.auth.role);
  const name = useSelector((state) => state.users.currentUser.name);

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-sm bg-primary text-white p-2 px-2 font-semibold capitalize ">
        {role} dashboard
      </h1>
      <div className="text-gray-500 hidden md:visible text-sm">
       Hello {name}
      </div>
    </header>
  );
};

export default Navbar;