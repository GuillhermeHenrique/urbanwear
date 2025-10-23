// css
import classes from "./Input.module.css";

type InputProps = {
  name: string;
  text: string;
  type: string;
  placeholder: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  multiple?: boolean;
};

const Input = ({
  name,
  text,
  type,
  placeholder,
  handleOnChange,
  value,
  multiple,
}: InputProps) => {
  return (
    <div className={classes.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        multiple={multiple}
      />
    </div>
  );
};

export default Input;
