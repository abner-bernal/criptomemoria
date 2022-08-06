import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 1700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.overlay};
  display: flex;
  right: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Loader = styled.div`
  width: 50px;
  height: 50px;
  position: relative;

  div:nth-child(1), div:nth-child(2) {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 10px solid transparent;
    border-top-color: ${props => props.theme.colors.purple50};
  }

  div:nth-child(1) {
    z-index: 100;
    animation: spin 1s infinite;
  }

  div:nth-child(2) {
    border: 10px solid ${props => props.theme.colors.gray80};
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  } 
`;