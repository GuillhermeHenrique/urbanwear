import classes from "./App.module.css";

import { Outlet } from "react-router-dom";

import { ToastContainer } from "react-toastify";

// components
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div className={classes.container}>
      <Navbar />
      <ToastContainer position="bottom-right" theme="dark" />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
