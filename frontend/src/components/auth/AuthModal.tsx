// hooks
import { useState } from "react";

// css
import classes from "./AuthModal.module.css";

// components
import Modal from "../ui/Modal/Modal";
import Input from "../ui/Input/Input";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = () => {};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLogin ? (
        <div className={classes.form_container}>
          <div className={classes.title}>
            <h2>Login</h2>
            <p>Welcome back! Enter your data.</p>
          </div>
          <form>
            <Input
              name="email"
              text="E-mail"
              type="text"
              placeholder="Enter your e-mail"
              handleOnChange={handleChange}
            />
            <Input
              name="password"
              text="Password"
              type="password"
              placeholder="Enter yout password"
              handleOnChange={handleChange}
            />
            <input type="submit" value="Login" />
          </form>
          <p>
            Don't have an account?
            <span onClick={() => setIsLogin(false)}>Click here</span>
          </p>
        </div>
      ) : (
        <div className={classes.form_container}>
          <div className={classes.title}>
            <h2>Register</h2>
            <p>Welcome! Enter your data.</p>
          </div>
          <form>
            <Input
              name="name"
              text="Name"
              type="text"
              placeholder="Enter your name"
              handleOnChange={handleChange}
            />
            <Input
              name="email"
              text="E-mail"
              type="text"
              placeholder="Enter your e-mail"
              handleOnChange={handleChange}
            />
            <Input
              name="password"
              text="Password"
              type="password"
              placeholder="Enter your password"
              handleOnChange={handleChange}
            />
            <Input
              name="confirmpassword"
              text="Confirm password"
              type="password"
              placeholder="Confirm your password"
              handleOnChange={handleChange}
            />
            <input type="submit" value="Register" />
          </form>
          <p>
            Already have an account?
            <span onClick={() => setIsLogin(true)}>Click here</span>
          </p>
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
