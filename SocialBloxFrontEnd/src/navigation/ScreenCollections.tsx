import { SCREEN_NAMES } from '../constants/ScreenNames';
import { LoginScreen, SplashScreen } from '../screens';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import BottomTabNavigator from './BottomTabNavigator';

export const authStack = [
  {
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    name: 'RegisterScreen',
    component: RegisterScreen,
  },
  {
    name: 'SplashScreen',
    component: SplashScreen,
  },
];

export const dashboardStack = [
  {
    name: SCREEN_NAMES.HomeScreen,
    component: BottomTabNavigator,
  },
];

export const mergedStacks = [...dashboardStack, ...authStack];
