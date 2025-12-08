import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import Colors from '../../constants/Colors';
import { FONTS } from '../../constants/Fonts';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  style,
  titleStyle,
  ...rest
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonStyle, style]}
      disabled={disabled}
      {...rest}
    >
      <Text style={titleStyle}>{isLoading ? 'Signing Up...' : title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    height: moderateScale(45),
    backgroundColor: Colors.black,
    width: '90%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateVerticalScale(30),
  },
  titleStyle: {
    fontSize: scale(14),
    fontFamily: FONTS.Bold,
    color: Colors.white,
  },
  disabledButton: {
    height: moderateScale(45),
    backgroundColor: Colors.gray,
    width: '90%',
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(30),
  },
  errorText: {
    color: Colors.red,
  },
});
export default AppButton;
