export interface UserRegister {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
