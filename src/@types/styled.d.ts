import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      highlight: string;

      overlay: string;

      gray10: string;
      gray50: string;
      gray80: string;
      gray85: string;
      gray90: string;
      gray95: string;

      darker: string;
      
      pink50: string;
      blue50: string;
      green50: string;
      purple30: string;
      purple50: string;
      purple70: string;
    }
  }
}