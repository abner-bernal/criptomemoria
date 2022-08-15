import { ReactNode, SetStateAction, useRef } from "react";
import { useDimensions } from "../../utils/use-dimensions";
import { motion } from "framer-motion";

import { Container, Menu, MenuItem, Navigation, OutSide, Overlay } from "./styles";

interface DropdownMenuProps {
  isOpen: boolean;
  children: ReactNode;
  navWidth?: number;
  menuItems: ReactNode[];
  setOpen: (value: SetStateAction<boolean>) => void;
}

const OutSideVar = {
  open: {  display: 'block' },
  closed: {
    transitionEnd: { display: "none" }
  },
}

const divVar = {
  closed: {
    scale: [1, 1.03, 1],
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "spring",
      bounce: 0.5,
    }
  },
}

const overlayVar = {
  open: {  opacity: 1, display: 'flex' },
  closed: {
    opacity: 0,
    transition: {
      delay: 0.5
    },
    transitionEnd: { display: "none" }
  },
}

const navigationVar = {
  open: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      bounce: 0.5,
    }
  },
  closed: { 
    y: -35,
    opacity: 0,
    transition: {
      delay: 0.4,
    }
  },
}

const menuVar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 93% 18px)`,
    transition: { 
      type: "spring",
      stiffness: 26,
      restDelta: 2,
      staggerChildren: 0.07, 
      delayChildren: 0.2 
    }
  }),
  closed: {
    clipPath: 'circle(18px at 93% 18px)',
    transition: { 
      type: "spring",
      duration: 0.6,
      delay: 0.3,
      staggerChildren: 0.03, 
      staggerDirection: -1 
    }
  }
};

const menuItemVar = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 40,
    opacity: 0,
    transition: {
      y: { stiffness: 1000, velocity: 0.3 }
    }
  }
};

function DropdownMenu({isOpen, setOpen, children, menuItems, navWidth}: DropdownMenuProps) {
  const containerRef = useRef(null);

  const { height } = useDimensions(containerRef);

  const handleOutsideClick = (event: any) => {
    if(event.target?.id === 'overlay') {
      setOpen(false);
    }
  }

  return(
    <>
      <OutSide 
        animate={isOpen ? "open" : "closed"}
        onClick={() => setOpen(false)} 
        initial={false}
        variants={OutSideVar}
      />
      <Container>
        <motion.div variants={divVar} initial={false} animate={isOpen ? "open" : "closed"}>
          { children }
        </motion.div>
        <Overlay 
          id='overlay'
          animate={isOpen ? "open" : "closed"}
          onClick={handleOutsideClick} 
          variants={overlayVar}
        >
          <Navigation variants={navigationVar}>
            <Menu 
              initial={false}
              width={navWidth}
              variants={menuVar}
              custom={height}
              ref={containerRef}
            >
              {
                menuItems.map((item, index) => (
                  <MenuItem 
                    key={index}
                    initial={false}
                    variants={menuItemVar}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </MenuItem>
                ))
              }
            </Menu>
          </Navigation>
        </Overlay>
      </Container>
    </>
  )
}

export default DropdownMenu;