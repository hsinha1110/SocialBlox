import { Alert, PermissionsAndroid, Platform } from 'react-native';

/**
 * Request Camera + Storage Permissions (Android)
 */
export const requestCameraPermission = async () => {
  try {
    if (Platform.OS !== 'android') return true;

    const sdk = Platform.Version;
    console.log('Android SDK:', sdk);

    const perms = [PermissionsAndroid.PERMISSIONS.CAMERA];

    if (sdk >= 33) {
      perms.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
    } else {
      perms.push(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
    }

    // 🔹 Pehle check karo already granted to nahi
    const alreadyGranted = await Promise.all(
      perms.map(p => PermissionsAndroid.check(p)),
    );

    if (alreadyGranted.every(v => v)) {
      console.log('All permissions already granted');
      return true; // is case me popup nahi aayega, normal hai
    }

    // 🔹 Ab system ka native popup aayega
    const granted = await PermissionsAndroid.requestMultiple(perms);

    const allGranted = perms.every(
      p => granted[p] === PermissionsAndroid.RESULTS.GRANTED,
    );

    if (!allGranted) {
      Alert.alert(
        'Permission required',
        'Camera aur gallery use karne ke liye permissions allow kariye.',
      );
      return false;
    }

    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const requestGalleryPermission = async () => {
  try {
    if (Platform.OS !== 'android') return true;

    const sdk = Platform.Version;
    const perms =
      sdk >= 33
        ? [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES]
        : [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE];

    const alreadyGranted = await Promise.all(
      perms.map(p => PermissionsAndroid.check(p)),
    );

    if (alreadyGranted.every(v => v)) {
      console.log('Gallery permission already granted');
      return true;
    }

    const granted = await PermissionsAndroid.requestMultiple(perms);

    const allGranted = perms.every(
      p => granted[p] === PermissionsAndroid.RESULTS.GRANTED,
    );

    if (!allGranted) {
      Alert.alert(
        'Permission required',
        'Gallery se photo choose karne ke liye permission allow kariye.',
      );
      return false;
    }

    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
};
