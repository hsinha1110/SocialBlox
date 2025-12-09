import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import { FONTS } from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginTop: moderateVerticalScale(80),
  },
  iconStyle: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
  },
  titleName: {
    fontSize: scale(12),
    fontFamily: FONTS.Bold,
    marginTop: moderateScale(10),
    color: Colors.black,
  },
  titleEmail: {
    fontSize: scale(12),
    fontFamily: FONTS.Bold,
    color: Colors.black,
  },
  followers: {
    fontSize: scale(12),
    fontFamily: FONTS.Bold,
  },
  countContainer: { justifyContent: 'center', alignItems: 'center' },
  count: {
    fontFamily: FONTS.Bold,
    color: Colors.black,
  },
  following: {
    fontFamily: FONTS.Black,
    color: Colors.black,
  },
  posts: {
    fontFamily: FONTS.Bold,
    color: Colors.black,
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: Colors.white,
    width: '40%',
  },
  socialContainer: {
    width: '90%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginTop: moderateVerticalScale(20),
    justifyContent: 'space-around',
  },
  titleStyle: { color: Colors.black },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
    color: Colors.black,
  },
});
export default styles;
