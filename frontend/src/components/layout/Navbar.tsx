// css
import classes from "./Navbar.module.css";

// icons
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { CgUserlane } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav id={classes.navbar}>
      <div className={classes.icon}>
        <a href="/">
          <CgUserlane />
        </a>
      </div>
      <div className={classes.links_container}>
        <ul className={classes.links}>
          <li>
            <a href="/">Tshirt</a>
          </li>
          <li>
            <a href="/">Shorts</a>
          </li>
          <li>
            <a href="/">Coat</a>
          </li>
          <li>
            <a href="/">Pants</a>
          </li>
          <li>
            <a href="/">Sneakers</a>
          </li>
        </ul>
      </div>
      <div className={classes.icons_link}>
        <a href="/">
          <FiShoppingCart />
        </a>
        <a href="/">
          <FaRegUser />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
