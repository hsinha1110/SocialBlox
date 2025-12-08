import React, { FC } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from './CustomText';
import { FONTS } from '../../constants/Fonts';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../constants/Colors';

interface Props {
  leftText: string;
  rightText: string;
  onPress?: () => void;
}

const CustomAuthLink: FC<Props> = ({ leftText, rightText, onPress }) => {
  return (
    <View style={styles.container}>
      <CustomText
        variant="h7"
        fontFamily={FONTS.Medium}
        style={styles.titleRightText}
      >
        {leftText}
      </CustomText>

      <TouchableOpacity onPress={onPress}>
        <CustomText
          variant="h7"
          fontFamily={FONTS.Bold}
          style={styles.titleRightText}
        >
          {rightText}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(5),
    bottom: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRightText: { color: Colors.black, marginLeft: moderateScale(5) },
  titleLeftText: { color: Colors.black },
});
export default CustomAuthLink;
