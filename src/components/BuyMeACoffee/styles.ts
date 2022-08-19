import styled, { keyframes } from "styled-components";
import CoffeeCupIcon from "../CoffeeCupIcon";

export const DonateButton = styled.button`
height: 42px;
border-radius: 22px;
width: 100%;
max-width: 300px;
padding: 7px 24px;
margin: 16px 0;
background-image: linear-gradient(to bottom right, ${props => props.theme.colors.gray80}, ${props => props.theme.colors.gray85});

display: flex;
justify-content: center;
align-items: center;
gap: 20px;

span {
  font-size: 2rem;
  line-height: 24px;
  font-weight: 400;
  color: ${props => props.theme.colors.gray10};
}

@media(max-width: 540px) {
  height: 40px;

  span {
    font-size: 1.7rem;
  }
}
`;

const shakeCoffee = keyframes`
0% {
  transform:matrix(1.00,0.00,0.00,1.00,0,0);
}
1% {
  transform:matrix(1.00,0.00,0.00,1.00,0,-6);
}
2% {
  transform:matrix(0.94,0.34,-0.34,0.94,3,-7);
}
3% {
  transform:matrix(0.96,-0.28,0.28,0.96,-4,-6);
}
4% {
  transform:matrix(1.00,0.00,0.00,1.00,0,-8);
}
5% {
  transform:matrix(1.00,0.00,0.00,1.00,0,4);
}
6%, 100% {
  transform:matrix(1.00,0.00,0.00,1.00,0,0);
}
`;

export const CoffeeCup = styled(CoffeeCupIcon)`
  height: 100%;
  width: auto;
  animation: ${shakeCoffee} 18s 3s forwards infinite;
`;