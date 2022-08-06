import { Container, Loader } from "./styles";


function LoadScreen() {
  return(
    <Container id={'globalLoader'}>
      <Loader>
        <div/>
        <div/>
      </Loader>
    </Container>
  )
}

export default LoadScreen;