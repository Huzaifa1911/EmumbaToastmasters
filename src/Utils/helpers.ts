import α from 'color-alpha';

export const getAlphaColor = (color: string, opacity: number) => {
  return α(color, opacity);
};
