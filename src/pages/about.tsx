import { NextPage } from "next";
import Link from "next/link";

import DonateButton from "../components/DonateButton";

import { 
  AuthorImage, 
  AuthorImageContainer,
  ButtonContainer,
  Content,
  DonateContainer,
  DonateTitle,
  ImageContainer, 
  LogoImage, 
  LogoImageContainer, 
  PayPalButton, 
  Text1, 
  Text2, 
  TextLink, 
  Title,
} from "../global/styles/about";

const About: NextPage = () => {

  return(
    <>      
      <ImageContainer>
        <AuthorImageContainer>
          <AuthorImage src='/author.jpg' width={180} height={180} alt='Author'/>
        </AuthorImageContainer>
        <LogoImageContainer>
          <LogoImage src='/criptoLogo.png' width={180} height={180} alt='Logo'/>
        </LogoImageContainer>
      </ImageContainer>
      <Title>Oi, tudo bom?</Title>
      <Content>
        <Text1>CriptoMemoria foi criado em Agosto de 2022, por mim 
          <Link href='https://www.linkedin.com/in/abner-bernal/' passHref>
            <TextLink target="_blank" rel="noopener noreferrer"> Abner Bernal
            </TextLink>
          </Link>
        .</Text1>
        <Text2>Uma ideia entre um turbilhão de ideias loucas da cabeça de um programador com muitos sonhos e poucas oportunidades.</Text2>
      </Content>
      {/* <DonateContainer>
        <DonateTitle>Apoie</DonateTitle>
        <ButtonContainer>
          <PayPalButton />
        </ButtonContainer>
      </DonateContainer> */}
    </>
  )
}

export default About;