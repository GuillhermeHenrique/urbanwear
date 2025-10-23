// css
import classes from "./App.module.css";

// router
import { Outlet } from "react-router-dom";

// components
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div className={classes.container}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
