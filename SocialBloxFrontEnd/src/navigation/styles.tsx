import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { FONTS } from '../constants/Fonts';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  titleStyle: {
    color: Colors.black,
    fontSize: scale(16),
    alignSelf: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    alignContent: 'center',
    fontFamily: FONTS.Bold,
  },
  menuStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginHorizontal: moderateScale(30),
  },
  headerLeftStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
