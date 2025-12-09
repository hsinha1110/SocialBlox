import React, { FC, useState } from 'react';
import { View, Platform, Alert, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IMAGES } from '../../../constants/Images';
import CustomAuthLink from '../../../components/globals/CustomAuthLink';
import { goBack } from '../../../utils/NavigationUtils';
import styles from './styles';
import CustomInput from '../../../components/globals/CustomInput';
import GradientButton from '../../../components/globals/GradientButton';
import { moderateScale } from 'react-native-size-matters';
import CustomLoader from '../../../components/globals/CustomLoader';
import GenderSelectionButton from '../../../components/globals/GenderSelectionButton';
import { AppDispatch } from '../../../redux/store/index';
import { useDispatch } from 'react-redux';
import { RegisterThunk } from '../../../redux/asyncThunk/auth.asyncThunk';
import {
  doPasswordsMatch,
  isValidEmail,
  isValidMobile,
  isValidPassword,
  isValidUsername,
} from '../../../utils/validationUtils';
import Colors from '../../../constants/Colors';

// Import PickerComp (your image picker modal)
import PickerComp from '../../../components/modal/pickerModal/PickerModal'; // import your Picker component

const RegisterScreen: FC = () => {
  const [userName, setUserName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [selectedGender, setSelectedGender] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null); // State for profile pic URL
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const dispatch = useDispatch<AppDispatch>();

  const validate = () => {
    let valid = true;

    if (!isValidUsername(userName)) {
      setUserNameError('Username must be at least 3 characters');
      valid = false;
    } else setUserNameError('');

    if (!isValidMobile(mobile)) {
      setMobileNumberError('Enter a valid 10-digit mobile number');
      valid = false;
    } else setMobileNumberError('');

    if (!isValidEmail(email)) {
      setEmailError('Enter a valid email');
      valid = false;
    } else setEmailError('');

    if (!isValidPassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else setPasswordError('');

    if (!doPasswordsMatch(password, confirmPassword)) {
      setConfirmPasswordError("Passwords don't match");
      valid = false;
    } else setConfirmPasswordError('');

    if (!valid) return;

    handleRegister();
  };

  const handleRegister = async () => {
    setLoading(true);

    const payload = {
      username: userName,
      emailId: email,
      mobile: mobile,
      gender: selectedGender === 0 ? 'male' : 'female',
      password: password,
      profilePic, // Send profilePic with payload
    };

    setTimeout(async () => {
      try {
        const result = await dispatch(RegisterThunk(payload));

        if (RegisterThunk.fulfilled.match(result)) {
          Alert.alert('Success', 'Account created');
        } else {
          Alert.alert('Error', result.payload as string);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  // Callback function to set the image path when a user picks an image
  const handleImageSelection = (imagePath: string) => {
    setProfilePic(imagePath); // Store the selected image path
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: Colors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'android' ? 30 : 0}
    >
      {loading && <CustomLoader visible={loading} />}

      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            {/* Profile Picture Section */}
            <View>
              <View style={styles.profilePicContainer}>
                {profilePic ? (
                  <Image
                    source={{ uri: profilePic }}
                    style={styles.profilePic}
                  />
                ) : (
                  <Image
                    source={IMAGES.placeholder}
                    style={styles.profilePic}
                  />
                )}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={IMAGES.pencil} // Pencil icon to indicate editing
                    style={styles.pencil}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <CustomInput
              label="Username"
              value={userName}
              autoCapitalize="none"
              onChangeText={text => {
                setUserName(text);
                if (text.trim()) setUserNameError('');
              }}
              error={!!userNameError}
              errorMessage={userNameError}
            />

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
              label="Mobile"
              value={mobile}
              autoCapitalize="none"
              onChangeText={text => {
                setMobile(text);
                if (text.trim()) setMobileNumberError('');
              }}
              error={!!mobileNumberError}
              errorMessage={mobileNumberError}
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

            <CustomInput
              label="Confirm Password"
              value={confirmPassword}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={text => {
                setConfirmPassword(text);
                if (text.trim()) setConfirmPasswordError('');
              }}
              error={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
            />

            <View style={styles.genderButtonStyle}>
              <GenderSelectionButton
                isSelected={selectedGender === 0}
                onPress={() => {
                  setSelectedGender(0);
                }}
                imageSource={IMAGES.male}
              />
              <View style={styles.gapStyle} />
              <GenderSelectionButton
                isSelected={selectedGender === 1}
                onPress={() => {
                  setSelectedGender(1);
                }}
                imageSource={IMAGES.female}
              />
            </View>
          </View>

          <View style={{ marginTop: moderateScale(40) }}>
            <CustomAuthLink
              leftText="Already have an account?"
              rightText="Login"
              onPress={goBack}
            />
          </View>

          <View style={styles.buttonContainer}>
            <GradientButton title="Register" onPress={validate} />
          </View>
        </View>
      </View>

      {/* Picker Modal */}
      <PickerComp
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        setImageCallback={handleImageSelection}
        imageCamera={IMAGES.camera}
        imageGallery={IMAGES.gallery}
        imageCancel={IMAGES.close}
        camera="Take Photo"
        gallery="Choose from Gallery"
      />
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
