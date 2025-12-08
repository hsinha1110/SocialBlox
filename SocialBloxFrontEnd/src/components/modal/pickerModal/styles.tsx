import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { FONTS } from '../../../constants/Fonts';
import COLORS from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'red',
  },
  innerContainer: {
    backgroundColor: COLORS.transparent,
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalInnerView: {
    backgroundColor: COLORS.transparent,
    flex: 1,
    justifyContent: 'center',
  },
  modalImageContainer: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    height: moderateScale(150),
    marginHorizontal: 20,
    borderRadius: 10,
    borderColor: 'gray',
  },
  btnCancel: {
    position: 'absolute',
    top: scale(10),
    right: scale(15),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  imageCancel: {
    width: 15,
    height: 15,
    left: moderateScale(8),
  },
  cameraContainer: {
    justifyContent: 'center',
    width: '100%',
    marginStart: 10,
    marginTop: 2,
  },
  btnCamera: {
    flexDirection: 'row',
    bottom: 10,
    marginHorizontal: 20,
  },
  imageCamera: {
    width: 40,
    height: 40,
    tintColor: COLORS.black,
    top: 15,
  },
  cameraText: {
    color: COLORS.black,
    fontSize: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    fontFamily: FONTS.Bold,
    marginStart: moderateScale(20),
  },
  gallerybtn: {
    flexDirection: 'row',
    top: 10,
    marginHorizontal: 20,
  },
  galleryImage: {
    width: 40,
    height: 40,
    tintColor: COLORS.black,
    marginTop: 15,
  },
  galleryText: {
    color: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
    fontSize: scale(15),
    fontFamily: FONTS.Bold,
    marginStart: moderateScale(20),
  },
});

export default styles;
