// router
import { Link } from "react-router-dom";

// css
import classes from "./Footer.module.css";

// icons
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={classes.footer_container}>
      <footer>
        <div className={`${classes.footer_section} ${classes.about}`}>
          <h3>About</h3>
          <div className={classes.about_text}>
            <p>
              I specialize in developing modern software, creating innovative
              digital solutions focused on user experience and performance.
            </p>
          </div>
          <div className={classes.about_icons}>
            <a href="/">
              <FaLinkedin />
            </a>
            <a href="/">
              <FaGithub />
            </a>
            <a href="/">
              <MdEmail />
            </a>
          </div>
        </div>
        <div className={`${classes.footer_section} ${classes.links}`}>
          <h3>Links</h3>
          <Link to="/">Home</Link>
          <Link to="/">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/profile">My Account</Link>
        </div>
        <div className={`${classes.footer_section} ${classes.categories}`}>
          <h3>Categories</h3>
          <Link to="/tshirt">Tshirt</Link>
          <Link to="/shorts">Shorts</Link>
          <Link to="/coat">Coat</Link>
          <Link to="/pants">Pants</Link>
          <Link to="/sneakers">Sneakers</Link>
        </div>
        <div className={`${classes.footer_section} ${classes.contact}`}>
          <h3>Contact</h3>
          <div className={classes.contact_section}>
            <FaPhoneAlt />
            <p>+55 (19) 974202486</p>
          </div>
          <div className={classes.contact_section}>
            <MdEmail />
            <p>piresguilherme003@gmail.com</p>
          </div>
          <div className={classes.contact_section}>
            <FaLocationPin />
            <p>São Paulo, Brasil</p>
          </div>
        </div>
      </footer>
      <div className={classes.rights_container}>
        <div className={classes.rights}>
          <span>&copy;</span>
          <p>
            {new Date().getFullYear()} Guilherme Henrique. All rights reserved.
          </p>
        </div>
        <div className={classes.terms}>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Use</a>
          <a href="/">Cookie Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
