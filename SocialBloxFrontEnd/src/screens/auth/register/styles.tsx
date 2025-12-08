import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.white,
  },
  headerImage: {
    flex: 1,
    width: '100%',
  },
  headerTitle: {
    marginHorizontal: moderateScale(20),
    bottom: moderateScale(30),
  },
  inputContainer: {
    marginTop: moderateScale(30),
  },
  buttonContainer: {
    marginBottom: moderateScale(20),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-around',
  },
  genderButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  gapStyle: {
    width: moderateScale(10),
  },

  // Profile Picture styles
  profilePicContainer: {
    alignItems: 'center',
    marginTop: moderateScale(50),
  },
  profilePic: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: 1,
    borderColor: Colors.gray,
    resizeMode: 'cover',
  },
  uploadText: {
    marginTop: moderateScale(8),
    fontSize: moderateScale(14),
    color: Colors.black,
  },
});

export default styles;
