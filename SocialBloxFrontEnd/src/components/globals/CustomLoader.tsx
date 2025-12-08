import React from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { moderateScale } from 'react-native-size-matters';
import { FONTS } from '../../constants/Fonts';
import Colors from '../../constants/Colors';

interface CustomLoaderProps {
  visible: boolean;
}

const CustomLoader: React.FC<CustomLoaderProps> = ({ visible }) => (
  <Modal visible={visible} transparent={true} animationType="fade">
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color={Colors.black} />
          <Text style={styles.loadingText}>Please Wait .....</Text>
        </View>
      </View>
    </View>
  </Modal>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: moderateScale(30),
  },
  title: {
    fontSize: RFValue(16),
    fontFamily: FONTS.Bold,
    color: Colors.black,
  },
  loading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: moderateScale(10),
    fontSize: RFValue(12),
    color: Colors.black,
    fontFamily: FONTS.Bold,
  },
});

export default CustomLoader;
