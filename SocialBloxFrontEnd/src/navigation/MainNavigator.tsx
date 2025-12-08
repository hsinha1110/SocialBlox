import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStack, dashboardStack } from './ScreenCollections';

const Stack = createNativeStackNavigator();

const MainNavigator: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      console.log(token, '.....user token');
      if (token) setIsLoggedIn(true);
    } catch (error) {
      console.log('Error checking token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    // Show splash/loading screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const stackToRender = isLoggedIn ? dashboardStack : authStack;

  return (
    <Stack.Navigator
      initialRouteName={stackToRender[0].name}
      screenOptions={{ headerShown: false }}
    >
      {stackToRender.map((item, index) => (
        <Stack.Screen key={index} name={item.name} component={item.component} />
      ))}
    </Stack.Navigator>
  );
};

export default MainNavigator;
