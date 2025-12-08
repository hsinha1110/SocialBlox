import React, { FC } from 'react';
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { FONTS } from '../../constants/Fonts';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

const GradientButton: FC<GradientButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
  disabled,
  loading,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.touchable, containerStyle, isDisabled && styles.disabled]}
    >
      <LinearGradient
        colors={['#181928', '#050612']} // same dark space-like gradient feel
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={[styles.title, textStyle]}>{title}</Text>
        )}
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: moderateScale(14),
    overflow: 'hidden',
  },
  gradient: {
    height: moderateScale(55),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONTS.Bold,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GradientButton;
