import React from 'react';
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import Colors from '../../constants/Colors';
import { moderateScale } from 'react-native-size-matters';

interface GenderSelectionButtonProps {
  isSelected: boolean;
  onPress: () => void;
  imageSource: ImageSourcePropType;
}

const GenderSelectionButton: React.FC<GenderSelectionButtonProps> = ({
  isSelected,
  onPress,
  imageSource,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonStyle,
        { borderColor: isSelected ? Colors.green : Colors.gray },
      ]}
    >
      <Image source={imageSource} style={styles.imageStyle} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imageStyle: { width: moderateScale(40), height: moderateScale(40) },
  buttonStyle: {
    height: moderateScale(100),
    width: moderateScale(160),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: moderateScale(10),
  },
});
export default GenderSelectionButton;
