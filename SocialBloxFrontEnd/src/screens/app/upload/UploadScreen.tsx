import React, { useEffect, useState } from 'react';
import {
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Text,
} from 'react-native';
import ScreenWrapper from '../../../components/globals/ScreenWrapper';
import { IMAGES } from '../../../constants/Images';
import PickerComp from '../../../components/modal/pickerModal/PickerModal';
import AppButton from '../../../components/globals/AppButton';
import styles from './styles';

import {
  addPostAsyncThunk,
  getUserProfileByIdThunk,
  postUpdateByIdAsyncThunk,
} from '../../../redux/asyncThunk/auth.asyncThunk';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { GetProfileResponse } from '../../../types/types';

type ImagePath = string;

const UploadScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImagePath>('');
  const [caption, setCaption] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const isFocused = useIsFocused();
  const route = useRoute<any>();
  const { editMode, caption: editCaption, imageUrl } = route.params || {};
  const setImage = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const handleCaptionChange = (text: string) => {
    setCaption(text);
  };
  useEffect(() => {
    if (editMode) {
      setCaption(editCaption || '');
      setSelectedImage(imageUrl || '');
    }
  }, [editMode]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedId = await AsyncStorage.getItem('userId');
        setId(storedId);
        console.log('User ID from AsyncStorage:', storedId);
      } catch (e) {
        console.log('AsyncStorage read error:', e);
      }
    };

    fetchUserData();
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
        setUserName(res.data.username);
      })
      .catch(err => {
        console.log('Profile fetch error:', err);
      });
  };

  const handleUpload = async () => {
    if (!caption.trim() && !selectedImage && !imageUrl) {
      Alert.alert('Error', 'Please add a caption or select an image');
      return;
    }

    if (!id || !userName) {
      Alert.alert('Error', 'User not found. Please login again.');
      return;
    }

    try {
      setUploading(true);
      const payload = {
        userId: id as string,
        caption,
        username: userName,
        imageUri: selectedImage || (editMode ? imageUrl : undefined),
      };

      let resultAction;

      if (editMode && route.params.postId) {
        // Update post
        resultAction = await dispatch(
          postUpdateByIdAsyncThunk({ ...payload, postId: route.params.postId }),
        );

        if (postUpdateByIdAsyncThunk.fulfilled.match(resultAction)) {
          Alert.alert('Success', 'Post updated successfully!');
          setCaption('');
          setSelectedImage('');
        } else {
          const errorMsg =
            (resultAction.payload as string) || 'Failed to update post';
          Alert.alert('Error', errorMsg);
        }
      } else {
        try {
          await dispatch(addPostAsyncThunk(payload)).unwrap();
          Alert.alert('Success', 'Post uploaded successfully!');
          setCaption('');
          setSelectedImage('');
        } catch (err) {
          const errorMsg = (err as string) || 'Failed to upload post';
          Alert.alert('Error', errorMsg);
        }
      }
    } catch (error: any) {
      console.log('Upload error: ', error);
      Alert.alert('Error', error?.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  const isDisabled = (caption === '' && selectedImage === '') || uploading;

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Upload Post</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.captionWrapper}>
          <TextInput
            value={caption}
            onChangeText={handleCaptionChange}
            style={styles.captionInput}
            placeholder="Enter your caption"
            multiline
          />
        </View>

        <View style={styles.postContainer}>
          {selectedImage !== '' && (
            <View style={styles.selectedImageWrapper}>
              <Image
                style={styles.postImageStyle}
                source={{ uri: selectedImage }}
              />

              <View style={styles.closeIconWrapper}>
                <TouchableOpacity
                  onPress={() => setSelectedImage('')}
                  style={styles.closeButton}
                >
                  <Image style={styles.closeIcon} source={IMAGES.close} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <AppButton
            disabled={isDisabled}
            title={uploading ? 'Uploading...' : 'Post'}
            onPress={handleUpload}
            style={[
              styles.buttonStyle,
              isDisabled ? styles.buttonDisabled : styles.buttonEnabled,
            ]}
            titleStyle={[
              styles.titleStyle,
              isDisabled
                ? styles.buttonTitleDisabled
                : styles.buttonTitleEnabled,
            ]}
          />
        </View>

        <View style={styles.addButtonWrapper}>
          <Pressable onPress={showModal} style={styles.addButtonStyle}>
            <Image source={IMAGES.plus} style={styles.plusIcon} />
          </Pressable>
        </View>
      </View>

      <PickerComp
        setImageCallback={setImage}
        imageCancel={IMAGES.close}
        imageCamera={IMAGES.camera}
        imageGallery={IMAGES.gallery}
        visible={modalVisible}
        onCancel={hideModal}
        camera="Choose from camera"
        gallery="Choose from gallery"
      />
    </ScreenWrapper>
  );
};

export default UploadScreen;
