import { ReactNode } from "react";

import { Container, ModalView } from "./styles";

interface ModalProps {
  id?: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({ id = 'modal', children, onClose = () => {} }: ModalProps) {

  const handleOutsideClick = (event: any) => {
    if(event.target?.id === id) onClose();
  }

  return(
    <ModalView id={id} onClick={handleOutsideClick}>
      <Container>
        { children }
      </Container>
    </ModalView>
  )
}

export default Modal;