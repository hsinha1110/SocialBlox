import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import styles from './styles';
import AppButton from '../../../components/globals/AppButton';
import { useIsFocused } from '@react-navigation/native';
import { getUserProfileByIdThunk } from '../../../redux/asyncThunk/auth.asyncThunk';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import { GetProfileResponse } from '../../../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../../components/globals/CustomInput';
import { navigate } from '../../../utils/NavigationUtils';
import { SCREEN_NAMES } from '../../../constants/ScreenNames';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const [id, setId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  useEffect(() => {
    const fetchId = async () => {
      const storedId = await AsyncStorage.getItem('userId');
      setId(storedId);
      console.log('User ID from AsyncStorage:', storedId);
    };

    fetchId();
  }, []);

  useEffect(() => {
    if (isFocused && id) {
      getProfile();
    }
  }, [isFocused, id]);

  const getProfile = () => {
    if (!id) return;

    dispatch(getUserProfileByIdThunk({ id }))
      .unwrap()
      .then((res: GetProfileResponse) => {
        console.log(res, '...res get profile');

        setUserName(res.data.username);
        setEmail(res.data.emailId); // Set email state
        setMobile(res.data.mobile); // Set mobile state
      })
      .catch(err => {
        console.log('Profile fetch error:', err);
      });
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.container}>
        <Image
          style={styles.iconStyle}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
          }}
        />

        <Text style={styles.titleName}>{userName}</Text>
        <Text style={styles.titleEmail}>{userEmail}</Text>

        <AppButton
          title="Edit Profile"
          style={styles.buttonStyle}
          titleStyle={styles.titleStyle}
          onPress={() => {
            navigate(SCREEN_NAMES.EditProfile);
          }}
        />

        {/* <View style={styles.socialContainer}>
          <View style={styles.countContainer}>
            <Text style={styles.count}>0</Text>
            <Text style={styles.followers}>Followers</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.count}>0</Text>
            <Text style={styles.following}>Following</Text>
          </View>
          <View style={styles.countContainer}>
            <Text style={styles.count}>0</Text>
            <Text style={styles.posts}>Posts</Text>
          </View>
        </View> */}

        <View style={styles.inputContainer}>
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
            editable={false}
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
            editable={false}
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
            editable={false}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
