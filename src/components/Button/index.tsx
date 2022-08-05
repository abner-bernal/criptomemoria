import { HTMLAttributes, ReactNode } from "react";
import { Container } from "./styles";

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return(
    <Container {...rest}>
      {children}
    </Container>
  );
}

export default Button;