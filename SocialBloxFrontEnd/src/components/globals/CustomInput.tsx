import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';

interface CustomInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  label: string;
  error?: boolean;
  errorMessage?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

const CustomInput: FC<CustomInputProps> = ({
  label,
  containerStyle,
  error,
  errorMessage,
  autoCapitalize,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        mode="outlined"
        label={label}
        style={styles.input}
        autoCapitalize={autoCapitalize}
        outlineColor={error ? stylesProps.errorColor : stylesProps.outlineColor}
        activeOutlineColor={
          error ? stylesProps.errorColor : stylesProps.activeOutlineColor
        }
        error={error}
        {...rest} // spreads all other TextInput props
      />

      {error && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const stylesProps = {
  outlineColor: '#BDBDBD',
  activeOutlineColor: '#1c1c29',
  errorColor: '#FF3B30', // iOS style red
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    backgroundColor: 'white',
  },
  errorText: {
    color: '#FF3B30',
    marginTop: 4,
    fontSize: 12,
  },
});

export default CustomInput;
