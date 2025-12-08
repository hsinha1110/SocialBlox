import { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';

interface ScreenWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
}

const ScreenWrapper: FC<ScreenWrapperProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
});

export default ScreenWrapper;
