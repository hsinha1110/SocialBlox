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

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isFocused = useIsFocused();

  const [id, setId] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

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
        setUserEmail(res.data.emailId);
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
          onPress={() => {}}
        />

        <View style={styles.socialContainer}>
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
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;
