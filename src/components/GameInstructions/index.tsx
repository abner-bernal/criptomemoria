import { MouseEvent, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import { useDimensions } from "../../utils/use-dimensions";

import { 
  ButtonStart, 
  CardsContainer, 
  CardView, 
  CloseB, 
  Container, 
  Overlay, 
  PageContainer, 
  PageIndex, 
  PageIndexContainer, 
  Piece, 
  Text, 
  TextAndPieceContainer, 
  TextContainer, 
  TextTimer, 
  Title, 
  Word 
} from "./styles";

interface GameInstructionsProps {
  initialPage: string;
  isOpen: boolean;
  setOpen: (value: SetStateAction<boolean>) => void;
}

const ModalVariants = {
  open: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    }
  },
  closed: {
    scale: 0 
  }
}

const ModalVariantsSmall = {
  open: {
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      delay: 0.10,
      duration: 0.2,
      stiffness: 150,
      damping: 20,
    }
  },
  closed: (height = 1170) => ({ 
    y: height,
    scale: 1,
    transition: {
      duration: 0.25,
    }
  })
}

type DimensionsProps = {
  height: number,
  width: number
}

function GameInstructions({ initialPage, isOpen, setOpen }: GameInstructionsProps) {
  const { colors } = useContext(ThemeContext);

  const [dimensions, setDimensions] = useState<DimensionsProps>({ height: 0, width: 1000 });

  const initialPageNumber = useCallback(() => {
    switch (initialPage) {
      case '/':
        return 0; 
      case '/frenetic':
        return 1;
      default: return 0;
    }
  }, [initialPage])

  const [currentPage, setCurrentPage] = useState<number>(initialPageNumber());

  const overlayVariants = {
    open: { 
      opacity: 1, 
      display: 'flex', 
      transition: { duration: 0.10 } 
    },
    closed: { 
      opacity: 0,
      transition: {
        delay: dimensions.width <= 820 ? 0.25 : 0,
        duration: dimensions.width <= 820 ? 0.2 : 0.25
      },
      transitionEnd: { display: "none" }
    },
  }

  useEffect(() => {
    setCurrentPage(initialPageNumber());
  }, [initialPage, initialPageNumber])

  const page = () => {
    switch (currentPage) {
      case 0: 
        return <ClassicMode />;
      case 1: 
        return <FreneticMode />;
    }
  };

  const pagesIndex = useCallback(() => {
    const modes = ['classic', 'frenetic']; 

    return(
      <PageIndexContainer>
        {
          modes.map((_, index) => {
            const indexStyle = currentPage === index ? 
              {backgroundColor: colors.gray90} : undefined;

            return(
              <PageIndex 
                key={index}
                style={indexStyle}
                onClick={() => setCurrentPage(index)}
              >
                { index+1 }
              </PageIndex>
            );
          })
        }
        <CloseB onClick={() => setOpen(false)}/>
      </PageIndexContainer>
    )
  }, [currentPage, colors.gray90, setOpen])

  const handleOutsideClick = (e: MouseEvent<HTMLDivElement>) => {
    const clickable = e.target as HTMLDivElement;
    if(clickable.id === 'overlay') setOpen(false);
  }

  useEffect(() => {  
    setDimensions({
      height: window.screen.availHeight,
      width: window.screen.width
    });
  }, []);

  return(
    <Overlay 
      id='overlay'
      onClick={handleOutsideClick}
      animate={isOpen ? "open" : "closed"}
      variants={overlayVariants}
    >
      <Container
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={dimensions.width <= 820 ? ModalVariantsSmall : ModalVariants}
      >
        {page()}
        {pagesIndex()}
      </Container>
    </Overlay>
  );
}

const ClassicMode = () => {
  return(
    <PageContainer>
      <Title>Modo Cl??ssico</Title>
      <Text>Descriptografe a palavra mist??rio em tr??s tentativas.</Text>
      <Word>
        <Piece char="s" status="decrypted" />
        <Piece char="o" status="decrypted" />
        <Piece char="???" status="encrypted" />
        <Piece char="???" status="encrypted" />
        <Piece char="???" status="encrypted" />
      </Word>
      <CardsContainer>
        <CardView id="1" letter="" symbol=""/>
        <CardView id="2" letter="o" symbol="???" flipped/>
        <CardView id="3" letter="" symbol=""/>
        <CardView id="4" letter="" symbol=""/>
      </CardsContainer>
      <TextContainer>
        <Text>A carta pode conter o s??mbolo correspondente por??m n??o conter a letra correta.</Text>
        <Text>Vire as cartas na sequ??ncia dos s??mbolos, caso contr??rio ter?? que recome??ar.</Text>
        <Text>Depois de cada tentativa de sequ??ncia, as pe??as mostram o qu??o perto voc?? est?? da solu????o.</Text>
      </TextContainer>
      <Word>
        <Piece char="s" status="correct" />
        <Piece char="o" status="correct" />
        <Piece char="n" status="correct" />
        <Piece char="d" status="incorrect" />
        <Piece char="a" status="incorrect" />
      </Word>
      <TextAndPieceContainer>
        <Text>As letras</Text>        
        <Word>
          <Piece char="s" status="correct" />
          <Piece char="o" status="correct" />
          <Piece char="n" status="correct" />
        </Word>
        <Text>est??o corretas.</Text>        
      </TextAndPieceContainer>
      <TextAndPieceContainer>
        <Text>As letras</Text>        
        <Word>
          <Piece char="d" status="incorrect" />
          <Piece char="a" status="incorrect" />
        </Word>
        <Text>n??o fazem parte da palavra ou est??o em outra posi????o.</Text>        
      </TextAndPieceContainer>
      <Text>Uma palavra nova aparece a cada dia.</Text>
    </PageContainer>
  );
};

const FreneticMode = () => {
  return(
    <PageContainer>
      <Title>Modo Fren??tico</Title>
      <Text>
        Todas as instru????es do modo cl??ssico s??o aplicadas a este modo, 
        adicionando o objetivo de descriptografar a palavra o mais 
        r??pido poss??vel.
      </Text>        
      <TextAndPieceContainer>
        <Text>O bot??o</Text>
        <ButtonStart>Iniciar</ButtonStart>
        <Text>inicializa o jogo e distribui as cartas.</Text>
      </TextAndPieceContainer>
      <Text>O tempo para concluir a sequ??ncia correta das cartas ?? relativo ao tamanho da palavra.</Text>
      <Text>
        Quando o tempo zera todos as cartas s??o embaralhadas, 
        reiniciando o jogo.
      </Text>
      <Text>Uma palavra nova aparece a cada dia.</Text>
    </PageContainer>
  );
};

export default GameInstructions;