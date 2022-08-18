import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      highlight: string;

      overlay: string;

      gray10: string;
      gray30: string;
      gray50: string;
      gray80: string;
      gray85: string;
      gray90: string;
      gray90Soft: string;
      gray95: string;

      darker: string;
      
      pink50: string;

      blue30: string;
      blue50: string;
      bluePayPal50: string;
      bluePayPal80: string;

      green50: string;
      green60: string;

      purple30: string;
      purple50: string;
      purple70: string;
    }
  }
}