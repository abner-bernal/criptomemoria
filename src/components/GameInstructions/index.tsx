import { useCallback, useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import { 
  ButtonStart, 
  CardsContainer, 
  CardView, 
  Container, 
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
  initialPage?: 0 | 1;
}

function GameInstructions({initialPage = 0 }: GameInstructionsProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const { colors } = useContext(ThemeContext);

  const classicMode = useCallback(() => {
    return(
      <PageContainer>
        <Title>Modo Clássico</Title>
        <Text>Descriptografe a palavra encontrando as cartas com os símbolos correspondentes as letras criptografadas.</Text>
        <Word>
          <Piece char="s" status="decrypted" />
          <Piece char="o" status="decrypted" />
          <Piece char="♩" status="encrypted" />
          <Piece char="☼" status="encrypted" />
          <Piece char="♡" status="encrypted" />
        </Word>
        <CardsContainer>
          <CardView id="1" letter="" symbol=""/>
          <CardView id="2" letter="o" symbol="∞" flipped/>
          <CardView id="3" letter="" symbol=""/>
          <CardView id="4" letter="" symbol=""/>
        </CardsContainer>
        <TextContainer>
          <Text>A carta pode conter o símbolo correspondente porém não ser a letra correta.</Text>
          <Text>Vire as cartas na sequência dos símbolos, caso contrário terá que recomeçar.</Text>
          <Text>Depois de cada tentativa de sequência, as peças mostram o quão perto você está da solução.</Text>
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
          <Text>estão corretas.</Text>        
        </TextAndPieceContainer>
        <TextAndPieceContainer>
          <Text>As letras</Text>        
          <Word>
            <Piece char="d" status="incorrect" />
            <Piece char="a" status="incorrect" />
          </Word>
          <Text>não fazem parte da palavra ou estão em outra posição.</Text>        
        </TextAndPieceContainer>
        <Text>Uma palavra nova aparece a cada dia.</Text>
      </PageContainer>
    );
  }, []);

  const freneticMode = useCallback(() => {
    return(
      <PageContainer>
        <Title>Modo Frenético</Title>
        <Text>
          Todas as instruções do modo clássico são aplicadas a este modo, 
          adicionando o objetivo de descriptografar a palavra o mais 
          rápido possível.
        </Text>        
        <TextAndPieceContainer>
          <Text>O botão</Text>
          <ButtonStart>Iniciar</ButtonStart>
          <Text>inicializa o jogo e distribui as cartas.</Text>
        </TextAndPieceContainer>
        <TextAndPieceContainer>
          <Text>O tempo para concluir a sequência correta das cartas é de</Text>
          <TextTimer>01:30</TextTimer>
          <Text>minutos.</Text>
        </TextAndPieceContainer>
        <Text>
          Quando o tempo zera todos as cartas são embaralhadas, 
          reiniciando o jogo.
        </Text>
        <Text>Uma palavra nova aparece a cada dia.</Text>
      </PageContainer>
    );
  }, []);

  const page = useCallback(() => {
    switch (currentPage) {
      case 0: 
        return classicMode();
      case 1: 
        return freneticMode();
    }
  }, [currentPage, classicMode, freneticMode])

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
      </PageIndexContainer>
    )
  }, [currentPage, colors.gray90])

  return(
    <Container>
      {page()}
      {pagesIndex()}
    </Container>
  );
}

export default GameInstructions;