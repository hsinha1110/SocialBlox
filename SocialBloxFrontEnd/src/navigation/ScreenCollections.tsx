import { SCREEN_NAMES } from '../constants/ScreenNames';
import { LoginScreen, SplashScreen } from '../screens';
import CommentSceen from '../screens/app/comments/CommentSceen';
import Comments from '../screens/app/comments/CommentSceen';
import EditProfile from '../screens/app/editProfile/EditProfile';
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
  {
    name: SCREEN_NAMES.CommentScreen,
    component: CommentSceen,
  },
  {
    name: SCREEN_NAMES.EditProfile,
    component: EditProfile,
  },
];

export const mergedStacks = [...dashboardStack, ...authStack];
