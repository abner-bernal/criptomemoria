import { memo } from "react";

import { Icon } from "./styles";

function Star() {
  return (
    <Icon
      fill="#fff"
      fillOpacity={0.3}
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox={`0 0 30 28`}
      imageRendering="optimizeQuality"
      textRendering="geometricPrecision"
      shapeRendering="geometricPrecision"
    >
      <path d="M16.58 1.05l2.82 6.69c.25.6.78.99 1.43 1.04l7.24.61c.71.06 1.27.51 1.49 1.18.22.67.02 1.37-.51 1.83l-5.5 4.74c-.49.42-.7 1.05-.55 1.69l1.66 7.06c.16.69-.09 1.36-.66 1.78-.57.41-1.29.44-1.9.08l-6.21-3.76a1.68 1.68 0 00-1.78 0L7.9 27.75c-.61.36-1.33.33-1.9-.08a1.69 1.69 0 01-.66-1.78L7 18.83c.15-.64-.06-1.27-.55-1.69L.95 12.4a1.69 1.69 0 01-.51-1.83c.22-.67.78-1.12 1.49-1.18l7.24-.61a1.66 1.66 0 001.43-1.04l2.82-6.69C13.69.4 14.3 0 15 0c.7 0 1.31.4 1.58 1.05z"></path>
    </Icon>
  );
}

export default memo(Star);