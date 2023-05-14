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
    primary: 'rgb(158, 62, 77)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(255, 218, 220)',
    onPrimaryContainer: 'rgb(64, 0, 16)',
    secondary: 'rgb(118, 86, 89)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(255, 218, 220)',
    onSecondaryContainer: 'rgb(44, 21, 23)',
    tertiary: 'rgb(119, 89, 48)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(255, 221, 182)',
    onTertiaryContainer: 'rgb(42, 24, 0)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(255, 251, 255)',
    onBackground: 'rgb(32, 26, 26)',
    surface: 'rgb(255, 251, 255)',
    onSurface: 'rgb(32, 26, 26)',
    surfaceVariant: 'rgb(244, 221, 222)',
    onSurfaceVariant: 'rgb(82, 67, 68)',
    outline: 'rgb(133, 115, 116)',
    outlineVariant: 'rgb(215, 193, 194)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(54, 47, 47)',
    inverseOnSurface: 'rgb(251, 238, 238)',
    inversePrimary: 'rgb(255, 178, 185)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(250, 242, 246)',
      level2: 'rgb(247, 236, 241)',
      level3: 'rgb(244, 230, 235)',
      level4: 'rgb(243, 228, 234)',
      level5: 'rgb(241, 225, 230)',
    },
    surfaceDisabled: 'rgba(32, 26, 26, 0.12)',
    onSurfaceDisabled: 'rgba(32, 26, 26, 0.38)',
    backdrop: 'rgba(59, 45, 46, 0.4)',
    accentGreen: '#46C779',
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
    primary: 'rgb(255, 178, 185)',
    onPrimary: 'rgb(97, 15, 33)',
    primaryContainer: 'rgb(127, 39, 54)',
    onPrimaryContainer: 'rgb(255, 218, 220)',
    secondary: 'rgb(229, 189, 191)',
    onSecondary: 'rgb(68, 41, 44)',
    secondaryContainer: 'rgb(92, 63, 66)',
    onSecondaryContainer: 'rgb(255, 218, 220)',
    tertiary: 'rgb(232, 192, 142)',
    onTertiary: 'rgb(68, 43, 6)',
    tertiaryContainer: 'rgb(93, 65, 27)',
    onTertiaryContainer: 'rgb(255, 221, 182)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(32, 26, 26)',
    onBackground: 'rgb(236, 224, 224)',
    surface: 'rgb(32, 26, 26)',
    onSurface: 'rgb(236, 224, 224)',
    surfaceVariant: 'rgb(82, 67, 68)',
    onSurfaceVariant: 'rgb(215, 193, 194)',
    outline: 'rgb(159, 140, 141)',
    outlineVariant: 'rgb(82, 67, 68)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(236, 224, 224)',
    inverseOnSurface: 'rgb(54, 47, 47)',
    inversePrimary: 'rgb(158, 62, 77)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(43, 34, 34)',
      level2: 'rgb(50, 38, 39)',
      level3: 'rgb(57, 43, 44)',
      level4: 'rgb(59, 44, 45)',
      level5: 'rgb(63, 47, 48)',
    },
    surfaceDisabled: 'rgba(236, 224, 224, 0.12)',
    onSurfaceDisabled: 'rgba(236, 224, 224, 0.38)',
    backdrop: 'rgba(59, 45, 46, 0.4)',
    accentGreen: '#46C779',
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
