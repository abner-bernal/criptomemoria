import { HTMLAttributes, memo, useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Container } from './styles';

function CloseButton({ ...rest }: HTMLAttributes<HTMLButtonElement>){
  const { colors } = useContext(ThemeContext);
  const size = 10;
  const strokeWidth = 2;
  const padding = strokeWidth/2;

  return(
    <Container {...rest}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <g
          stroke={colors.highlight}
          strokeLinecap='round'
          strokeWidth={strokeWidth}
        >
          <line 
            x1={padding} 
            y1={padding} 
            x2={size-padding} 
            y2={size-padding}
          />
          <line 
            x1={padding} 
            y1={size-padding} 
            x2={size-padding} 
            y2={padding}
          />
        </g>
      </svg>
    </Container>
  );
}

export default memo(CloseButton);