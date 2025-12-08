import React, { FC } from 'react';
import { Text, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../constants/Fonts';
import COLORS from '../../constants/Colors';

interface Props {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body'
    | 'body2'
    | 'caption'
    | 'small'
    | 'button';
  fontFamily?: FONTS;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
}

const CustomText: FC<Props> = ({
  variant = 'body',
  fontFamily = FONTS.Regular,
  fontSize,
  style,
  children,
  numberOfLines,
}) => {
  const variantSizes: Record<string, number> = {
    h1: 28,
    h2: 24,
    h3: 22,
    h4: 20,
    h5: 18,
    h6: 16,
    h7: 14,
    h8: 12,
    h9: 10,
    body: 14,
    body2: 13,
    caption: 12,
    small: 11,
    button: 15,
  };

  const computedFontSize = RFValue(fontSize || variantSizes[variant]);

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontSize: computedFontSize,
          color: COLORS.white,
          fontFamily,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default CustomText;
