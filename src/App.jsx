import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavbarSimple } from "./components/Navbar";
const App = () => {
  return (
    <>
      <main className="md:mx-16 xl:mx-64">
        <NavbarSimple />
        <ToastContainer />
        <Outlet />
      </main>
    </>
  );
};

export default App;
