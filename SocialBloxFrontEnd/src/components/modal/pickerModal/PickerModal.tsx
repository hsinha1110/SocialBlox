import React, { FC, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import styles from './styles';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

interface PickerCompProps {
  visible: boolean;
  onCancel: () => void;
  setImageCallback: (path: string) => void;
  imageCamera: any;
  imageGallery: any;
  imageCancel: any;
  camera: string;
  gallery: string;
}

const PickerComp: FC<PickerCompProps> = ({
  visible,
  onCancel,
  setImageCallback,
  imageCamera,
  imageGallery,
  imageCancel,
  camera,
  gallery,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onGallery = async () => {
    try {
      const image: ImageOrVideo = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setImageCallback(image.path);
      onCancel();
    } catch (error) {
      console.warn(error);
    }
  };

  const onCamera = async () => {
    try {
      const image: ImageOrVideo = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setImageCallback(image.path);
      onCancel();
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onCancel}
      >
        <TouchableOpacity
          onPressOut={onCancel}
          style={styles.modalInnerView}
          activeOpacity={1}
        >
          <View style={styles.modalImageContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
              <Image
                resizeMode="contain"
                style={styles.imageCancel}
                source={imageCancel}
              />
            </TouchableOpacity>
            <View style={styles.cameraContainer}>
              <TouchableOpacity style={styles.btnCamera} onPress={onCamera}>
                <Image
                  resizeMode="contain"
                  style={styles.imageCamera}
                  source={imageCamera}
                />
                <Text style={styles.cameraText}>{camera}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.gallerybtn} onPress={onGallery}>
                <Image
                  resizeMode="contain"
                  style={styles.galleryImage}
                  source={imageGallery}
                />
                <Text style={styles.galleryText}>{gallery}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PickerComp;
