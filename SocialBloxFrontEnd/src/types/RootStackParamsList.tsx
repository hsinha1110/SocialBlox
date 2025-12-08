import { SCREEN_NAMES } from '../constants/ScreenNames';

type SplashScreenParams = {
  title?: string;
};

type RegisterScreenParams = {
  title?: undefined;
};

type LoginScreenParams = {
  title?: undefined;
};

export type RootStackParamList = {
  [SCREEN_NAMES.SplashScreen]: SplashScreenParams;
  [SCREEN_NAMES.LoginScreen]: LoginScreenParams;
  [SCREEN_NAMES.RegisterScreen]: RegisterScreenParams;
};
