import React from 'react';

interface SpritesImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

const SpritesImage: React.FC<SpritesImageProps> = ({ src, alt = '', width = 64, height = 64, style = {}, ...props }) => (
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    style={{ display: 'block', ...style }}
    {...props}
  />
);

export default SpritesImage;