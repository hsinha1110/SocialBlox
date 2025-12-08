import React, { FC, useState } from 'react';
import { View, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomText from '../../../components/globals/CustomText';
import CustomAuthLink from '../../../components/globals/CustomAuthLink';
import CustomInput from '../../../components/globals/CustomInput';
import GradientButton from '../../../components/globals/GradientButton';
import CustomLoader from '../../../components/globals/CustomLoader';
import { FONTS } from '../../../constants/Fonts';
import { moderateScale } from 'react-native-size-matters';
import styles from './styles';
import { navigate } from '../../../utils/NavigationUtils';
import { SCREEN_NAMES } from '../../../constants/ScreenNames';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/RootStackParamsList';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { LoginThunk } from '../../../redux/asyncThunk/auth.asyncThunk';
import { isValidEmail, isValidPassword } from '../../../utils/validationUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../constants/Colors';

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginScreen: FC<Props> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const validate = () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    } else setEmailError('');

    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else setPasswordError('');

    if (!valid) return;

    handleLogin();
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const payload = { emailId: email, password };
      const result = await dispatch(LoginThunk(payload));

      if (LoginThunk.fulfilled.match(result)) {
        const accessToken = result.payload.data.accessToken;
        const userId = result.payload.data.user._id;
        const userName = result.payload.data.username;
        console.log('userId:', userId);
        console.log('userName:', userName);

        if (accessToken) {
          await AsyncStorage.setItem('userToken', accessToken);
        }

        if (userId) {
          await AsyncStorage.setItem('userId', userId);
        }
        if (userName) {
          await AsyncStorage.setItem('userName', userName);
        }
        Alert.alert('Success', 'Logged in successfully');
      } else {
        Alert.alert('Error', result.payload || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      alwaysBounceVertical={false}
      style={{ flex: 1, backgroundColor: Colors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'android' ? 30 : 0}
    >
      <View style={styles.container}>
        {loading && <CustomLoader visible={loading} />}

        <View style={styles.headerContainer}>
          <CustomText
            style={styles.headerTitle}
            variant="h2"
            fontFamily={FONTS.Bold}
          >
            Login
          </CustomText>

          <CustomText
            style={styles.headerTitle}
            variant="h8"
            fontFamily={FONTS.Regular}
          >
            Enter email and password to login
          </CustomText>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <CustomInput
              label="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={text => {
                setEmail(text);
                if (text.trim()) setEmailError('');
              }}
              error={!!emailError}
              errorMessage={emailError}
            />

            <CustomInput
              label="Password"
              value={password}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
                if (text.trim()) setPasswordError('');
              }}
              error={!!passwordError}
              errorMessage={passwordError}
            />
          </View>

          <View style={{ marginTop: moderateScale(40) }}>
            <CustomAuthLink
              leftText="Don't have an account?"
              rightText="Register"
              onPress={() => navigate(SCREEN_NAMES.RegisterScreen)}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton onPress={validate} title="Login" />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
