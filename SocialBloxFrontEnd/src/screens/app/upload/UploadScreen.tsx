import React, { useState } from 'react';
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
import Colors from '../../../constants/Colors';
import storage from '@react-native-firebase/storage';
// agar Firestore bhi use karna ho to uncomment karo
// import firestore from '@react-native-firebase/firestore';

type ImagePath = string;

const UploadScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImagePath>('');
  const [caption, setCaption] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState<number>(0);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const setImage = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const handleCaptionChange = (text: string) => {
    setCaption(text);
  };

  // 🔥 IMAGE UPLOAD TO FIREBASE STORAGE
  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    try {
      setUploading(true);
      setTransferred(0);

      // image-crop-picker se jo path aata hai
      const fileUri = selectedImage; // like "file:///..."

      // unique file name
      const fileName = `posts/${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}.jpg`;

      const reference = storage().ref(fileName);

      const task = reference.putFile(fileUri);

      // progress listener
      task.on('state_changed', taskSnapshot => {
        const progress =
          (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
        setTransferred(Math.round(progress));
      });

      // wait for upload
      await task;

      // get download URL
      const downloadURL = await reference.getDownloadURL();
      console.log('✅ Image URL:', downloadURL);
      console.log('📝 Caption:', caption);

      // 🔹 OPTIONAL: Firestore me save karna ho to
      // await firestore().collection('posts').add({
      //   caption,
      //   imageUrl: downloadURL,
      //   createdAt: firestore.FieldValue.serverTimestamp(),
      //   // userId: 'currentUserId',
      // });

      Alert.alert('Success', 'Image uploaded successfully!');

      // reset state
      setSelectedImage('');
      setCaption('');
      setUploading(false);
      setTransferred(0);
    } catch (error: any) {
      console.log('Upload error: ', error);
      Alert.alert('Upload failed', error?.message || 'Something went wrong');
      setUploading(false);
    }
  };

  const isDisabled = (caption === '' && selectedImage === '') || uploading;

  return (
    <ScreenWrapper>
      <View style={styles.buttonContainer}>
        {/* Caption Input */}
        <View style={{ width: '95%', marginTop: 20 }}>
          <TextInput
            value={caption}
            onChangeText={handleCaptionChange}
            style={{
              height: 100,
              borderWidth: 0.5,
              borderColor: Colors.gray,
              width: '95%',
              paddingStart: 20,
              borderRadius: 10,
            }}
            placeholder="Enter your caption"
            multiline
          />
        </View>

        {/* Image Preview + Post Button */}
        <View style={styles.postContainer}>
          {selectedImage !== '' && (
            <View style={{ width: '100%', height: 200 }}>
              <Image
                style={styles.postImageStyle}
                source={{ uri: selectedImage }}
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginEnd: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => setSelectedImage('')}
                  style={{
                    backgroundColor: Colors.white,
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    margin: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={IMAGES.close}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {uploading && (
            <Text style={{ marginTop: 8 }}>Uploading: {transferred}%</Text>
          )}

          <AppButton
            disabled={isDisabled}
            title={uploading ? 'Uploading...' : 'Post'}
            onPress={handleUpload}
            style={{
              ...styles.buttonStyle,
              backgroundColor: isDisabled ? Colors.gray : Colors.black,
            }}
            titleStyle={{
              ...styles.titleStyle,
              color: isDisabled ? Colors.black : Colors.white,
            }}
          />
        </View>

        {/* Add Button */}
        <View style={{ flex: 1 }}>
          <Pressable onPress={showModal} style={styles.addButtonStyle}>
            <Image source={IMAGES.plus} style={styles.plusIcon} />
          </Pressable>
        </View>
      </View>

      {/* Modal for Picker */}
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
