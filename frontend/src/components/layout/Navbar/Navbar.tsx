// hooks
import { useState } from "react";

// router
import { Link } from "react-router-dom";

// css
import classes from "./Navbar.module.css";

// icons
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { CgUserlane } from "react-icons/cg";

// components
import AuthModal from "../../auth/AuthModal";

const Navbar = () => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <nav id={classes.navbar}>
        <div className={classes.icon}>
          <a href="/">
            <CgUserlane />
          </a>
        </div>
        <div className={classes.links_container}>
          <ul className={classes.links}>
            <li>
              <Link to="/tshirt">Tshirt</Link>
            </li>
            <li>
              <Link to="/shorts">Shorts</Link>
            </li>
            <li>
              <Link to="/coat">Coat</Link>
            </li>
            <li>
              <Link to="/pants">Pants</Link>
            </li>
            <li>
              <Link to="/sneakers">Sneakers</Link>
            </li>
          </ul>
        </div>
        <div className={classes.icons_link}>
          <a href="/">
            <FiShoppingCart />
          </a>
          <a onClick={() => setModal(true)}>
            <FaRegUser />
          </a>
        </div>
      </nav>
      <AuthModal isOpen={modal} onClose={() => setModal(false)} />
    </>
  );
};

export default Navbar;
