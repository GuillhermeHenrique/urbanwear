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
          <h3>ABOUT</h3>
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
          <h3>LINKS</h3>
          <a href="/">Home</a>
          <a href="/">Products</a>
          <a href="/">Cart</a>
          <a href="/">My Account</a>
        </div>
        <div className={`${classes.footer_section} ${classes.categories}`}>
          <h3>CATEGORIES</h3>
          <a href="/">Tshirt</a>
          <a href="/">Shorts</a>
          <a href="/">Coat</a>
          <a href="/">Pants</a>
          <a href="/">Sneakers</a>
        </div>
        <div className={`${classes.footer_section} ${classes.contact}`}>
          <h3>CONTACT</h3>
          <div className={classes.contact_section}>
            <FaPhoneAlt />
            <p>(19) 974202486</p>
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
          &copy;
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
