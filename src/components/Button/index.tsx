import { Button as MUIButton, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  customClassName?: string;
}

const Button = ({
  variant = "contained",  // MUI sử dụng "contained", "outlined", hoặc "text"
  size = "medium",        // MUI có các kích thước: "small", "medium", "large"
  children,
  customClassName,
  ...props
}: CustomButtonProps) => {
  return (
    <MUIButton
      variant={variant}
      size={size}
      className={customClassName}
      {...props}
    >
      {children}
    </MUIButton>
  );
};

export default Button;
