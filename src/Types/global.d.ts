import {TAppColors, TAppTheme} from 'Assets';

declare global {
  namespace AppTheme {
    type TColors = keyof TAppColors;
    type ThemeType = {theme?: TAppTheme};
  }
}
