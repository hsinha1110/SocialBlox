import { View, Pressable, Image, StyleSheet, Text } from 'react-native';
import React, { FC } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '../../constants/Colors';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onPress?: () => void;
  imageSource?: any;
}

const CustomHeader: FC<HeaderProps> = ({
  title,
  showBack = true,
  onPress,
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      {showBack ? (
        <Pressable onPress={onPress}>
          <Image
            source={imageSource}
            style={styles.icon}
            resizeMode="contain"
          />
        </Pressable>
      ) : (
        <View style={styles.placeholder}>
          <Text style={{ color: COLORS.black }}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 60,
    marginHorizontal: 20,
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  placeholder: {
    width: RFValue(20),
  },
});

export default CustomHeader;
