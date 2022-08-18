import PayPalIcon from "../PayPalIcon";
import { Container, Content, Icon } from "./styles";

declare global {
  interface Window {
    PayPal: any;
  }
}

const DonateButton = ({...rest}) => {

  const handleClickDonate = () => {
    window.PayPal.Donation.Checkout({
      env: 'production',
      hosted_button_id: '6GKPEAWPT3YHY',
    }).renderTo(window.parent)
  } 

  return (
    <Container onClick={handleClickDonate} {...rest}>
      <Content>
        <Icon />
        <span> Doar</span>
      </Content>
    </Container>
  );
};

export default DonateButton;