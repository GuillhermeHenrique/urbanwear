import { useContext, useState } from "react";

import { ApiContext } from "../../context/ApiContext";

import classes from "./AuthModal.module.css";

// components
import Modal from "../ui/Modal/Modal";
import Input from "../ui/Input/Input";

import type { UserLogin, UserRegister } from "../../types/User";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, login } = useContext(ApiContext);
  const [userRegister, setUserRegister] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
  };

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegister({ ...userRegister, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(userRegister);

    register(userRegister);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(userLogin);

    login(userLogin);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLogin ? (
        <div className={classes.form_container}>
          <div className={classes.title}>
            <h2>Login</h2>
            <p>Welcome back! Please, enter your details.</p>
          </div>
          <form onSubmit={handleSubmitLogin}>
            <Input
              name="email"
              text="E-mail"
              type="email"
              placeholder="Enter your e-mail"
              handleOnChange={handleChangeLogin}
            />
            <Input
              name="password"
              text="Password"
              type="password"
              placeholder="Enter yout password"
              handleOnChange={handleChangeLogin}
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
            <p>Welcome! Please, enter your details.</p>
          </div>
          <form onSubmit={handleSubmitRegister}>
            <Input
              name="name"
              text="Name"
              type="text"
              placeholder="Enter your name"
              handleOnChange={handleChangeRegister}
            />
            <Input
              name="email"
              text="E-mail"
              type="email"
              placeholder="Enter your e-mail"
              handleOnChange={handleChangeRegister}
            />
            <Input
              name="password"
              text="Password"
              type="password"
              placeholder="Enter your password"
              handleOnChange={handleChangeRegister}
            />
            <Input
              name="confirmpassword"
              text="Confirm password"
              type="password"
              placeholder="Confirm your password"
              handleOnChange={handleChangeRegister}
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
