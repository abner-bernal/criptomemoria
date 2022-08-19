import { memo } from "react";

function CoffeeCupIcon({...rest}) {
  return (
    <svg
      {...rest}
      width='237'
      height='292'
      fillRule='evenodd'
      clipRule='evenodd'
      imageRendering='optimizeQuality'
      shapeRendering='geometricPrecision'
      textRendering='geometricPrecision'
      viewBox='0 0 237 291.05'
    >
      <defs>
        <linearGradient
          id='id0'
          x1='118.25'
          x2='118.25'
          y1='27.45'
          y2='63.83'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#A24E27'></stop>
          <stop offset='1' stopColor='#853214'></stop>
        </linearGradient>
        <linearGradient
          id='id1'
          x1='116.71'
          x2='116.71'
          y1='0.17'
          y2='27.45'
          gradientUnits='userSpaceOnUse'
          xlinkHref='#id0'
        ></linearGradient>
        <linearGradient
          id='id2'
          x1='52.65'
          x2='162.17'
          y1='87.59'
          y2='266.67'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#EC8501'></stop>
          <stop offset='1' stopColor='#E56901'></stop>
        </linearGradient>
        <linearGradient
          id='id3'
          x1='1.12'
          x2='203.74'
          y1='71.57'
          y2='264.46'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0' stopColor='#FFD868'></stop>
          <stop offset='1' stopColor='#FEC52B'></stop>
        </linearGradient>
      </defs>
      <g fillRule='nonzero'>
        <path
          fill='url(#id3)'
          d='M217.35 54.72L189.76 291.22 44.78 291.22 17.16 54.72z'
        ></path>
        <path
          fill='url(#id2)'
          d='M199.07 244.97H35.35L17.16 109.29h200.11l-18.19 135.67-.01.01zm-81.19-37.83c.81 0 1.59.23 2.27.65l20.5 12.41c.69.42 1.48.64 2.28.65.92 0 1.83-.3 2.57-.86a4.33 4.33 0 001.84-3.53c0-.35-.04-.69-.13-1.02l-5.45-23.3c-.08-.34-.12-.69-.12-1.05 0-1.26.55-2.46 1.51-3.28l18.14-15.63a4.29 4.29 0 001.52-3.28c0-.48-.08-.95-.23-1.39a4.284 4.284 0 00-3.81-3.04l-23.86-2a4.31 4.31 0 01-3.69-2.68l-9.28-22.05a4.359 4.359 0 00-4.03-2.69h-.09a4.32 4.32 0 00-3.99 2.69l-9.28 22.06a4.317 4.317 0 01-3.69 2.67l-23.86 2a4.32 4.32 0 00-3.83 3.04c-.15.44-.22.9-.22 1.36 0 1.28.56 2.49 1.53 3.31l18.12 15.63c.98.81 1.54 2.01 1.54 3.28 0 .36-.04.71-.12 1.05l-5.47 23.3a3.8 3.8 0 00-.12 1c0 1.41.68 2.74 1.83 3.55.74.56 1.65.86 2.58.86.79-.01 1.59-.23 2.27-.65l20.48-12.41c.69-.42 1.48-.65 2.29-.65z'
        ></path>
        <path
          fill='url(#id0)'
          d='M18.19 27.45H218.3c10.05 0 18.2 8.15 18.2 18.19v18.19H0V45.64C0 35.6 8.15 27.45 18.19 27.45z'
        ></path>
        <path
          fill='url(#id1)'
          d='M43.92.17h145.55c10.04 0 18.19 8.14 18.19 18.19v9.09H25.75v-9.09C25.75 8.32 33.88.18 43.92.17z'
        ></path>
      </g>
    </svg>
  );
}

export default memo(CoffeeCupIcon);