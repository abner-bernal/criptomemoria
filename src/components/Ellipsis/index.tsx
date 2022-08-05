import { useContext } from 'react';

import { ThemeContext } from 'styled-components';

export function Ellipsis(){
  const { colors } = useContext(ThemeContext);

  return(
    <svg 
      height='3'
      width='14'
      fill={colors.highlight}
    >
      <g>
        <circle cx="1.5" cy="1.5" r="1.5"/>
        <circle cx="7" cy="1.5" r="1.5"/>
        <circle cx="12.5" cy="1.5" r="1.5"/>
      </g>
    </svg>
  );
}