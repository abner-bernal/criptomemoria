import { CoffeeCup, DonateButton } from "./styles";

function BuyMeACoffee() {

  const handleClickDonate = () => {
    window.PayPal.Donation.Checkout({
      env: 'production',
      hosted_button_id: '6GKPEAWPT3YHY',
    }).renderTo(window.parent)
  } 

  return(
    <DonateButton onClick={handleClickDonate}>
      <span>Me pague um café</span>
      <CoffeeCup />
    </DonateButton>
  );
}

export default BuyMeACoffee;