import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';
import { FONTS } from '../../../constants/Fonts';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: moderateScale(16),
  },

  captionWrapper: {
    width: '95%',
    marginTop: moderateScale(20),
    alignSelf: 'center',
  },

  captionInput: {
    height: moderateScale(100),
    borderWidth: 0.5,
    borderColor: Colors.gray,
    width: '100%',
    paddingStart: moderateScale(16),
    borderRadius: moderateScale(10),
    textAlignVertical: 'top',
    fontFamily: FONTS.Regular,
    fontSize: moderateScale(14),
    color: Colors.black,
  },

  postContainer: {
    width: '100%',
    marginTop: moderateScale(20),
    alignItems: 'center',
  },

  selectedImageWrapper: {
    width: '100%',
    height: moderateScale(200),
  },

  postImageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(12),
  },

  closeIconWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginEnd: moderateScale(20),
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(-10),
  },

  closeButton: {
    backgroundColor: Colors.white,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  closeIcon: {
    width: moderateScale(15),
    height: moderateScale(15),
    resizeMode: 'contain',
  },

  buttonStyle: {
    marginTop: moderateScale(20),
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(10),
  },

  buttonEnabled: {
    backgroundColor: Colors.black,
  },

  buttonDisabled: {
    backgroundColor: Colors.gray,
  },

  titleStyle: {
    fontFamily: FONTS.Bold,
    fontSize: moderateScale(16),
  },

  buttonTitleEnabled: {
    color: Colors.white,
  },

  buttonTitleDisabled: {
    color: Colors.black,
  },

  addButtonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: moderateScale(190),
  },

  addButtonStyle: {
    alignSelf: 'center',
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    elevation: 4,
  },

  plusIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    color: Colors.black,
  },
});

export default styles;
