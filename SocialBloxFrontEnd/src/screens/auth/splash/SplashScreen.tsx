import { View, Text } from 'react-native';
import React, { FC, useEffect } from 'react';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import { resetAndNavigate } from '../../../utils/NavigationUtils';
import { SCREEN_NAMES } from '../../../constants/ScreenNames';

const SplashScreen: FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      resetAndNavigate(SCREEN_NAMES.LoginScreen);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <ScreenWrapper>
      <Text>SplashScreen</Text>
    </ScreenWrapper>
  );
};

export default SplashScreen;
