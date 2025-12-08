import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import styles from './styles';
import { SCREEN_NAMES } from '../constants/ScreenNames';
import Colors from '../constants/Colors';
import { IMAGES } from '../constants/Images';
import { HomeScreen, ProfileScreen, UploadScreen } from '../screens';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.black,
        tabBarInactiveTintColor: Colors.gray,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 80,
        },
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name={SCREEN_NAMES.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ backgroundColor: focused ? Colors.white : undefined }}
            >
              <Image
                style={[
                  styles.imageStyle,
                  { tintColor: focused ? Colors.black : Colors.gray },
                ]}
                source={IMAGES.home}
              />
            </View>
          ),
        }}
      />

      {/* Upload Tab */}
      <Tab.Screen
        name={SCREEN_NAMES.UploadScreen}
        component={UploadScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ backgroundColor: focused ? Colors.white : undefined }}
            >
              <Image
                style={[
                  styles.imageStyle,
                  { tintColor: focused ? Colors.black : Colors.gray },
                ]}
                source={IMAGES.upload}
              />
            </View>
          ),
        }}
      />

      {/* Profile Tab */}
      <Tab.Screen
        name={SCREEN_NAMES.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{ backgroundColor: focused ? Colors.white : undefined }}
            >
              <Image
                style={[
                  styles.imageStyle,
                  { tintColor: focused ? Colors.black : Colors.gray },
                ]}
                source={IMAGES.account}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
