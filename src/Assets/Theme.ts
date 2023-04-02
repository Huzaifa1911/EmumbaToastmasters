export const AppTheme = {
  fonts: {
    Thin: 'Poppins-Thin',
    Regular: 'Poppins-Regular',
    Medium: 'Poppins-SemiBold',
    Bold: 'Poppins-Bold',
  } as const,

  colors: {
    primary: '#2759CD',
    text: '#304166',
    white: '#EFF5FC',
    onSurface: '#BDD1FF',
    error: '#EE4932',
    grey: '#e5e8ed',
    placeHolder: '#bcc4d4',
  } as const,
};

export type TAppTheme = typeof AppTheme;
