import {useColorScheme} from 'react-native';
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as LightTheme,
  configureFonts,
  useTheme,
} from 'react-native-paper';

export const FONTS = {
  Thin: 'Poppins-Thin',
  Regular: 'Poppins-Regular',
  Medium: 'Poppins-SemiBold',
  Bold: 'Poppins-Bold',
  'Italic-Regular': 'Poppins-Italic',
};

const fontsConfig = {
  // displaySmall: {fontFamily: FONTS.Regular, fontSize: 20, fontWeight: '400'},
  // displayMedium: {fontFamily: FONTS.Medium, fontSize: 20, fontWeight: '600'},
  // displayLarge: {fontFamily: FONTS.Bold, fontSize: 20, fontWeight: '700'},

  // headlineSmall: {fontFamily: FONTS.Regular, fontSize: 28, fontWeight: '400'},
  // headlineMedium: {fontFamily: FONTS.Medium, fontSize: 28, fontWeight: '600'},
  // headlineLarge: {fontFamily: FONTS.Bold, fontSize: 28, fontWeight: '700'},

  // titleSmall: {fontFamily: FONTS.Regular, fontSize: 18, fontWeight: '400'},
  // titleMedium: {fontFamily: FONTS.Medium, fontSize: 18, fontWeight: '600'},
  // titleLarge: {fontFamily: FONTS.Bold, fontSize: 18, fontWeight: '700'},

  // labelSmall: {fontFamily: FONTS.Regular, fontSize: 16, fontWeight: '400'},
  // labelMedium: {fontFamily: FONTS.Medium, fontSize: 16, fontWeight: '600'},
  // labelLarge: {fontFamily: FONTS.Bold, fontSize: 16, fontWeight: '700'},

  // bodySmall: {fontFamily: FONTS.Regular, fontSize: 14, fontWeight: '400'},
  // bodyMedium: {fontFamily: FONTS.Medium, fontSize: 14, fontWeight: '600'},
  // bodyLarge: {fontFamily: FONTS.Bold, fontSize: 14, fontWeight: '700'},

  italic: {fontFamily: FONTS['Italic-Regular'], fontWeight: '400'},
  bold: {fontFamily: FONTS.Bold, fontWeight: '700'},
  regular: {fontFamily: FONTS.Regular, fontWeight: '400'},
  medium: {fontFamily: FONTS.Medium, fontWeight: '600'},
  thin: {fontFamily: FONTS.Thin, fontWeight: '300'},
};

export const AppLightTheme = {
  ...LightTheme,
  colors: {
    primary: 'rgb(71, 85, 182)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(223, 224, 255)',
    onPrimaryContainer: 'rgb(0, 13, 95)',
    secondary: 'rgb(91, 93, 114)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(224, 225, 249)',
    onSecondaryContainer: 'rgb(24, 26, 44)',
    tertiary: 'rgb(119, 83, 108)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 215, 240)',
    onTertiaryContainer: 'rgb(45, 18, 39)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(27, 27, 31)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(27, 27, 31)',
    surfaceVariant: 'rgb(227, 225, 236)',
    onSurfaceVariant: 'rgb(70, 70, 79)',
    outline: 'rgb(118, 118, 128)',
    outlineVariant: 'rgb(199, 197, 208)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(48, 48, 52)',
    inverseOnSurface: 'rgb(243, 240, 244)',
    inversePrimary: 'rgb(187, 195, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(246, 243, 251)',
      level2: 'rgb(240, 238, 249)',
      level3: 'rgb(235, 233, 247)',
      level4: 'rgb(233, 231, 246)',
      level5: 'rgb(229, 228, 245)',
    },
    surfaceDisabled: 'rgba(27, 27, 31, 0.12)',
    onSurfaceDisabled: 'rgba(27, 27, 31, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
    accentGreen: '#46C779',
    brightGreen: '#07ED6F',
    transparent: 'transparent',
    white: 'rgb(255, 255, 255)',
  },
  roundness: 2,
  fonts: configureFonts({
    config: {
      fontSize: 16,
      ...fontsConfig,
    },
  }),
};

export const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    primary: 'rgb(187, 195, 255)',
    onPrimary: 'rgb(17, 34, 134)',
    primaryContainer: 'rgb(45, 60, 156)',
    onPrimaryContainer: 'rgb(223, 224, 255)',
    secondary: 'rgb(196, 197, 221)',
    onSecondary: 'rgb(45, 47, 66)',
    secondaryContainer: 'rgb(67, 69, 89)',
    onSecondaryContainer: 'rgb(224, 225, 249)',
    tertiary: 'rgb(230, 186, 215)',
    onTertiary: 'rgb(69, 38, 61)',
    tertiaryContainer: 'rgb(93, 60, 84)',
    onTertiaryContainer: 'rgb(255, 215, 240)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(27, 27, 31)',
    onBackground: 'rgb(228, 225, 230)',
    surface: 'rgb(27, 27, 31)',
    onSurface: 'rgb(228, 225, 230)',
    surfaceVariant: 'rgb(70, 70, 79)',
    onSurfaceVariant: 'rgb(199, 197, 208)',
    outline: 'rgb(144, 144, 154)',
    outlineVariant: 'rgb(70, 70, 79)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(228, 225, 230)',
    inverseOnSurface: 'rgb(48, 48, 52)',
    inversePrimary: 'rgb(71, 85, 182)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(35, 35, 42)',
      level2: 'rgb(40, 40, 49)',
      level3: 'rgb(45, 46, 56)',
      level4: 'rgb(46, 47, 58)',
      level5: 'rgb(49, 51, 62)',
    },
    surfaceDisabled: 'rgba(228, 225, 230, 0.12)',
    onSurfaceDisabled: 'rgba(228, 225, 230, 0.38)',
    backdrop: 'rgba(47, 48, 56, 0.4)',
    accentGreen: '#46C779',
    brightGreen: '#07ED6F',
    transparent: 'transparent',
    white: 'rgb(255, 255, 255)',
  },
  roundness: 2,
  fonts: configureFonts({
    config: {
      fontSize: 16,
      ...fontsConfig,
    },
  }),
};

export type TAppLightTheme = typeof AppLightTheme;
export type TAppDarkTheme = typeof AppDarkTheme;
export type TAppLightThemeColors = typeof AppLightTheme.colors;
export type TAppDarkThemeColors = typeof AppLightTheme.colors;

export type TAppTheme = TAppDarkTheme | TAppLightTheme;
export type TAppColors = TAppLightThemeColors | TAppDarkThemeColors;
export type TFontsVariants = '';

export const useAppTheme = (): TAppTheme => {
  const colorScheme = useColorScheme();
  const darkTheme = useTheme<TAppDarkTheme>();
  const lightTheme = useTheme<TAppLightTheme>();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
};
