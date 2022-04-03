import { useState, useEffect } from 'react';

export const useImageSize = (src) => {
  const [image, setImage] = useState();

  useEffect(() => {
    const image = new Image();
    image.src = src;

    image.onload = function (e) {
      setImage(image);
    };
  }, [src]);

  return image;
};
